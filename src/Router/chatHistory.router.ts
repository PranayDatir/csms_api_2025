import express from "express";
import ticketConversationController from "../Controllers/chatHistoryController";
import auth from "../middleware/auth";

const chatRouter = express.Router();

chatRouter.route("/sendMessage").post(auth.checkAuthWeb, ticketConversationController.sendMessage);
chatRouter.route("/sendMessage").get(auth.checkAuthWeb, ticketConversationController.getAllMessages);

export default chatRouter;