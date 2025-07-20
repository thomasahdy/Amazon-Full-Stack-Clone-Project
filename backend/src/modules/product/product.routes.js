import { verifyToken } from "../../middleware/verifyToken.js";
import { getproduct, getProductById, getCategories, addproduct, updateProduct, deleteProduct } from "./product.controler.js";
import express from 'express'

export const productRoutes = express.Router()

//no authentication
productRoutes.get("/products", getproduct)
productRoutes.get("/products/categories", getCategories)
productRoutes.get("/products/:id", getProductById)

// authentication required
productRoutes.use(verifyToken)

productRoutes.post("/product", addproduct)
productRoutes.put("/product/:id", updateProduct)
productRoutes.delete("/product/:id", deleteProduct)

