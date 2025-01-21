import express from "express"
import { accountModel, userModel } from "../db";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { userMiddleware } from "../middlewares/userMiddleware";
require('dotenv').config()
const userRouter = express.Router();
userRouter.use(express.json())

userRouter.post('/signup', async(req,res)=>{
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,2);
    await userModel.create({
        username, email, password:hashedPassword
    })
    res.json({
        message:"user signup successfull"
    })
})

userRouter.post('/signin', async(req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({ email })
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

userRouter.get('/dashboard', userMiddleware, (req, res)=>{
    res.json({
        message:"dashboard",
        userId: req.userId
    })
})

userRouter.get('/bulk',async(req,res)=>{
    const users = await userModel.find();
    res.json({
        users: users.map(user =>({
            username:user.username,
            email:user.email
        }))
    })
        
})


export default userRouter;