import { CartModel } from "../../../db/models/cart.js";
import { ProductModel } from "../../../db/models/product.js";

const getCart = async (req, res) => {
    try {
        const cart = await CartModel.findOne({ userId: req.user._id })
            .populate('products.productId', 'product_name discounted_price img_link')
        
        if (!cart) {
            return res.json({ message: "Cart is empty", cart: { products: [] } });
        }
        
        res.json({ message: "Cart retrieved successfully", cart });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving cart", error: error.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        let cart = await CartModel.findOne({ userId: req.user._id });
        
        if (!cart) {
            cart = new CartModel({
                userId: req.user._id,
                products: [{ productId, quantity }]
            });
        } else {
            const existingProduct = cart.products.find(
                item => item.productId.toString() === productId
            );
            
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        }
        
        await cart.save();
        await cart.populate('products.productId', 'product_name discounted_price img_link');
        
        res.json({ message: "Product added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error: error.message });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        
        if (quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }
        
        const cart = await CartModel.findOne({ userId: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        
        const productIndex = cart.products.findIndex(
            item => item.productId.toString() === productId
        );
        
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }
        
        cart.products[productIndex].quantity = quantity;
        await cart.save();
        await cart.populate('products.productId', 'product_name discounted_price img_link');
        
        res.json({ message: "Cart updated successfully", cart });
    } catch (error) {
        res.status(500).json({ message: "Error updating cart", error: error.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        
        const cart = await CartModel.findOne({ userId: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        
        cart.products = cart.products.filter(
            item => item.productId.toString() !== productId
        );
        
        await cart.save();
        await cart.populate('products.productId', 'product_name discounted_price img_link');
        
        res.json({ message: "Product removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Error removing from cart", error: error.message });
    }
};

const clearCart = async (req, res) => {
    try {
        const cart = await CartModel.findOne({ userId: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        
        cart.products = [];
        await cart.save();
        
        res.json({ message: "Cart cleared successfully", cart });
    } catch (error) {
        res.status(500).json({ message: "Error clearing cart", error: error.message });
    }
};

export {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
}; 