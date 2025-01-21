import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

export async function userMiddleware(req: Request, res: Response, next:NextFunction){
    const token = req.headers.authorization;
    if(!token){
        return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: string}

    if(decoded){
        req.userId = decoded.userId; 
        next();
    }
}

