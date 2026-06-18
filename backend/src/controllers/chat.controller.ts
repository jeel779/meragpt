import {  GoogleGenAI } from "@google/genai";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { prisma } from "../lib/prisma.js";
import type { Request, Response } from "express";
import { chatSchema } from "../utils/schemas.js";
export const newChat = asyncHandler(async (req:Request, res:Response) => {
  const userId = req.userId
  const user = await prisma.user.findFirst({
    where:{
      id:Number(userId)
    }
  })
  if (!user) {
    throw new ApiError(404, "User does not exist")
  }

  const question = req.body?.content;
  const { success } = chatSchema.safeParse({ content: question })
  if (!success) {
    throw new ApiError(400, "Invalid chat data")
  }
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string});

  const response = await ai.models.generateContent({
    model:  "gemini-3-flash-preview",
    contents: question,
  }) ;
  const text = response.text;
 
  if (!text) {
    throw new ApiError(500, "Failed to generate chat response");
  }
  const chat=await prisma.chat.create({ 
    data:{
      content:question,
      response:text,
      userId:user.id
    }
  })

  return res.status(200).json(new ApiResponse(200,chat,"chat response generated"));
});

export const deleteChatHistory = asyncHandler(async (req:Request, res:Response) => {

  const userId = req.userId
  const user = await prisma.user.findFirst({
    where:{
      id:Number(userId)
    }
  })
  if (!user) {
    throw new ApiError(404, "User does not exist")
  }
  await prisma.chat.deleteMany({
    where:{
      userId:user.id
    }
  })
  return res.status(200).json(new ApiResponse(200, null, "chat history successfully deleted"));
});

export const listAllChats = asyncHandler(async (req:Request, res:Response) => {
  const userId = req.userId
  const user = await prisma.user.findFirst({
    where:{
      id:Number(userId)
    }
  })
  if (!user) {
    throw new ApiError(404, "User does not exist")
  }
  const chats=await prisma.chat.findMany({
    where:{
      userId:user.id
    }
  })
  return res.status(200).json(new ApiResponse(200,chats,"chat history given"))
})