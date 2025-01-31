import { Router } from "express";
import { accountModel, userModel } from "../db";
import { userMiddleware } from "../middlewares/userMiddleware";
import mongoose from "mongoose";
import { randomNumber } from "../config";
import bcrypt from "bcrypt"

const router = Router();

router.post('/create', userMiddleware, async (req, res) => {
    const { accountName, accountType, password } = req.body;
    try {
        const user = await userModel.findOne({ _id: req.userId });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }

        const authenticated = await bcrypt.compare(password, user?.password!);
        
        if (authenticated) {
            const number = await randomNumber();
            await accountModel.create({
                userId: req.userId,
                accountName,
                accountType,
                accountNumber: number,
                balance: 10000,
            });
             res.json({ message: "Account created successfully" });
        } else {
             res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        console.error(error);
         res.status(500).json({ message: "Internal server error" });
    }
});


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

router.post('/transfer', userMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { amount, to } = req.body; ///MAJOR ISSUE: Transaction should happen based on accountId
        const account = await accountModel.findOne({ userId: req.userId }).session(session);

        if (!account || (account.balance ?? 0) < amount) {
            await session.abortTransaction();
            res.status(400).json({ message: "Insufficient balance" });
        }

        const toAccount = await accountModel.findOne({ _id: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            res.status(400).json({ message: "Invalid account" });
        }

        // Perform the transfer
        await accountModel.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await accountModel.updateOne({ _id: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        res.json({ message: "Transaction successful" });
    } catch (error) {
        await session.abortTransaction();
        console.error("Transaction failed:", error);
        res.status(500).json({ message: "Transaction failed" });
        session.endSession(); // Ensure session is always ended
    }
});



export default router;