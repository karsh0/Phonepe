import { Router } from "express";
import { accountModel, userModel } from "../db";
import { userMiddleware } from "../middlewares/userMiddleware";
import mongoose from "mongoose";
import { randomNumber } from "../config";

const router = Router();

router.post('/create', userMiddleware, async (req,res)=>{
    const {accountName, accountType} = req.body;
    const number = await randomNumber();
    await accountModel.create({
        userId: req.userId,
        accountName,
        accountType,
        accountNumber: number,
        balance: 10000
    })
    res.json({
        message:"account created successfully"
    })
})

router.get('/balance',userMiddleware, async(req,res)=>{
    const account = await accountModel.findOne({userId: req.userId});
    res.json({
        balance: account?.balance
    })
})

router.get('/accounts', userMiddleware, async (req,res)=>{
    const accounts = await accountModel.find({
        userId: req.userId
    })
    res.json({
        data: accounts
    })
})

router.post('/transfer', userMiddleware, async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction()
    const {amount, to} = req.body;

    const account = await accountModel.findOne({userId: req.userId}).session(session);

    if(!account || (account.balance ?? 0) < amount){
        await session.abortTransaction();
        res.json({
            message: 'Insufficient balance'
        })
        return;
    }

    const toAccount = await accountModel.findOne({userId: to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        res.json({
            message:"Invalid account"
        })
        return;
    }
    // Perform the transfer
    await accountModel.updateOne({ userId: req.userId }, { $inc: {balance: -amount}}).session(session);
    await accountModel.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    
    // Commit the transaction
    await session.commitTransaction();

    res.json({
        message: "transaction success"
    })
})



export default router;