import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import type { NextFunction, Request, Response } from "express";

interface CustomJwtPayload extends jwt.JwtPayload {
    _id: string;
}
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const verifyJWT = asyncHandler(async(req:Request, _:Response, next:NextFunction) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload

        const user = await User.findById(decodedToken?._id).select("-password")
        
        if (!user) {
            throw new ApiError(401, "Invalid Token")
        }
    
        req.userId = user._id.toString();
        next()
    } catch (error:any) {
        throw new ApiError(401, error?.message || "Invalid token")
    }
    
})