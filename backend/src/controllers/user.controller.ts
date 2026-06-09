import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import type { Request, Response } from "express";
import { userSchema } from "../utils/schemas.js";

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, username, password } = req.body
    const { success } = userSchema.safeParse({ email, username, password })
    if (!success) {
        throw new ApiError(400,"Invalid user data")
    }
    const existedUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existedUser) {
        return res.status(401).json({ message: "user already exist with this email or username " })
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    const createdUser = await User.findById(user._id).select("-password")
    return res.status(200).json(new ApiResponse(200, createdUser, "user created successfully"))

})
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body
    const { success } = userSchema.safeParse({ email, password, username: "dummy" })
    if (!success) {
        throw new ApiError(400, "Invalid user data")
    }
    if (!email) {
        throw new ApiError(400, "email is required")
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const loggedInUser = await User.findById(user._id).select("-password ")
    if (!loggedInUser) {
        throw new ApiError(404, "User not found");
    }
    const payload = {
        _id: loggedInUser._id
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "15d",
    });
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("token", token, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, token,
                },
                "User logged In Successfully"
            )
        )
})
export const checkAuth = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.userId
    if (!userId) {
        throw new ApiError(401, "Unauthorized");
    }
    const user = await User.findById(userId).select("-password")
    if (!user) {
        throw new ApiError(401, "User not found");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    user
                },
                "User is already logged in"
            )
        )
})
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("token", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})
