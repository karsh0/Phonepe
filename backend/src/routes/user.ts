import express from "express"
import { userModel } from "../db";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
require('dotenv').config()
const userRouter = express.Router();

userRouter.post('/signup', async(req,res)=>{
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,2);
    await userModel.create({
        username, email, hashedPassword
    })
    res.json({
        message:"user signup successfull"
    })
})

userRouter.post('/signin', async(req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({ email })
        if(!user){
            res.json({
                message:"user not found!"
            })
            return
        }
        const passwordMatch = await bcrypt.compare(password, user?.password)
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

userRouter.get('/dashboard', )


export default userRouter;