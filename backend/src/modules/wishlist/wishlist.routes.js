import { verifyToken } from "../../middleware/verifyToken.js";
import { 
    getWishlist, 
    addToWishlist, 
    removeFromWishlist, 
    clearWishlist 
} from "./wishlist.controller.js";
import express from 'express'

export const wishlistRoutes = express.Router()

wishlistRoutes.use(verifyToken)

wishlistRoutes.get("/wishlist", getWishlist)
wishlistRoutes.post("/wishlist/add", addToWishlist)
wishlistRoutes.delete("/wishlist/remove/:productId", removeFromWishlist)
wishlistRoutes.delete("/wishlist/clear", clearWishlist) 