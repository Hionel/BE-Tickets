import express from "express";
import * as ticketController from "../controllers/tickets-controller.js";
const ticketsRouter = express.Router();

ticketsRouter.post("/createTicket", ticketController.createTicket);
ticketsRouter.patch("/validateTicket/:id", ticketController.validateTicket);
ticketsRouter.get("/scanBarcode/:barcode", ticketController.scanBarcode);
ticketsRouter.patch("/payTicket/:id", ticketController.payTicket);

export default ticketsRouter;
