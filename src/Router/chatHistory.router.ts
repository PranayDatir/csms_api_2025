import express from "express"
import checkUserAuth, { authorizeRoles } from "../middleware/auth";
import ticketConversationController from "../Controllers/chatHistoryController";

const chatRouter = express.Router();

chatRouter.route("/sendMessage").post(checkUserAuth, authorizeRoles('Consumer', 'Support Agent'), ticketConversationController.sendMessage);
chatRouter.route("/sendMessage").get(checkUserAuth, authorizeRoles('Consumer', 'Support Agent'), ticketConversationController.getAllMessages);

export default chatRouter;