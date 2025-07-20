import { verifyToken } from "../../middleware/verifyToken.js";
import { 
    createOrder, 
    getOrders, 
    getOrderById, 
    updateOrderStatus 
} from "./order.controller.js";
import express from 'express'

export const orderRoutes = express.Router()

orderRoutes.use(verifyToken)

orderRoutes.post("/order", createOrder)
orderRoutes.get("/orders", getOrders)
orderRoutes.get("/order/:id", getOrderById)
orderRoutes.put("/order/:id/status", updateOrderStatus) 