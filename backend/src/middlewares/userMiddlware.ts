import { Request, Response, NextFunction } from "express";
import { userModel } from "../db";
import jwt from "jsonwebtoken";
require("dotenv").config();

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

export async function userMiddleware(req: Request, res: Response, next:NextFunction){
    const token = req.headers.authorization;
    if(!token){
        return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    
    const user = await userModel.findOne({_id: decoded.userId});
    if(!user){
        res.json({
            message:"user doesn't exist"
        })
    }
    if(decoded && user){
        res.userId = decoded.userId; 
        next();
    }
}

