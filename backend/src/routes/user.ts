import express from "express"
import { accountModel, roomModel, userModel } from "../db";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { userMiddleware } from "../middlewares/userMiddleware";
require('dotenv').config()
const userRouter = express.Router();
userRouter.use(express.json())


userRouter.post('/signup', async(req,res)=>{
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,2);
    await userModel.create({
        username, password:hashedPassword
    })
    res.json({
        message:"user signup successfull"
    })
})

userRouter.post('/signin', async(req,res)=>{
    const {username, password} = req.body;
    try{
        const user = await userModel.findOne({ username })
        if(!user || user.password == undefined){
            res.json({
                message:"user not found!"
            })
            return
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(user && passwordMatch){
            const token = jwt.sign({userId: user._id.toString()}, process.env.JWT_SECRET!)
            res.json({
                message:"user signin successfull",
                token
            })
        }
        else{
            res.json({
                message:"user/password didn't match"
            })
        }
    }catch(err){
        console.log(err)
    }
})

userRouter.get('/dashboard', userMiddleware,async (req, res)=>{
    const foundUser = await accountModel.findOne({userId: req.userId}).populate('userId')
    res.json({
        user: foundUser
    })
})

userRouter.get('/bulk',async(req,res)=>{
    const users = await accountModel.find().populate('userId');
    res.json({
        users: users.map(user =>({
            user
        }))
    })      
})

//chat function


userRouter.post('/room', userMiddleware, async(req,res)=>{
    const {receiverId} = req.body;
    const senderId = req.userId;
    try{
        const room = await roomModel.findOne({senderId})
        if(room){
            res.json({
                message: "room exists",
                roomId: room.roomId
            })
            return;
        }
        const roomId = `${senderId}-${receiverId}`
        await roomModel.create({
            senderId,
            receiverId,
            roomId
        })
        res.json({
            message: "room created success",
            roomId: roomId
        })
    }catch(e){
        console.log(e)
        res.json({message: e})
    }
})

userRouter.get('/room', userMiddleware, async (req, res) => {
    const { receiverId } = req.query;  // Use req.query for GET request
    const senderId = req.userId;
    
    const roomId = `${senderId}-${receiverId}`;
    const reverseRoomId = `${receiverId}-${senderId}`;
    
    // Check the room in the DB
    const room = await roomModel.findOne({ $or: [{ roomId }, { roomId: reverseRoomId }] });
    
    if (room) {
        res.json({ roomId: room.roomId });
    } else {
        res.json({ roomId: null });
    }
});

export default userRouter;