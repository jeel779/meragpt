import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { deleteChatHistory, listAllChats, newChat } from "../controllers/chat.controller.js";
const chatRouter=Router()
chatRouter.route("/").get(verifyJWT,listAllChats)
chatRouter.route("/new").post(verifyJWT,newChat)
chatRouter.route("/delete").delete(verifyJWT,deleteChatHistory)
export default chatRouter