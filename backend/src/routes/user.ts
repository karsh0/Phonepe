import express from "express"
import { accountModel, userModel } from "../db";
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
    const user = await accountModel.find({userId: req.userId}).populate('userId')
    res.json({
        message:"dashboard",
        user
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


export default userRouter;