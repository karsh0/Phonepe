import { Router } from "express";
import { accountModel } from "../db";

const accountRouter = Router();

accountRouter.post('/create', async (req,res)=>{
    const {accountName, accountType} = req.body;

    await accountModel.create({
        accountName, accountType
    })
    res.json({
        message:"account created successfully"
    })
})