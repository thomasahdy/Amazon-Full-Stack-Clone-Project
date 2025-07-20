import { verifyToken } from "../../middleware/verifyToken.js";
import { 
    getCart, 
    addToCart, 
    removeFromCart, 
    updateCartItem, 
    clearCart 
} from "./cart.controller.js";
import express from 'express'

export const cartRoutes = express.Router()

cartRoutes.use(verifyToken)

cartRoutes.get("/cart", getCart)
cartRoutes.post("/cart/add", addToCart)
cartRoutes.put("/cart/update/:productId", updateCartItem)
cartRoutes.delete("/cart/remove/:productId", removeFromCart)
cartRoutes.delete("/cart/clear", clearCart) 