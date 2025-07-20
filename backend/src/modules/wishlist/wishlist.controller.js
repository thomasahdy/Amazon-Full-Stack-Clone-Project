import { WishlistModel } from "../../../db/models/wishlist.js";
import { ProductModel } from "../../../db/models/product.js";

const getWishlist = async (req, res) => {
    try {
        const wishlist = await WishlistModel.findOne({ userId: req.user._id })
            .populate('products', 'product_name discounted_price img_link category')
        
        if (!wishlist) {
            return res.json({ message: "Wishlist is empty", wishlist: { products: [] } });
        }
        
        res.json({ message: "Wishlist retrieved successfully", wishlist });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving wishlist", error: error.message });
    }
};

const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        let wishlist = await WishlistModel.findOne({ userId: req.user._id });
        
        if (!wishlist) {
         
            wishlist = new WishlistModel({
                userId: req.user._id,
                products: [productId]
            });
        } else {
           
            if (wishlist.products.includes(productId)) {
                return res.status(400).json({ message: "Product already in wishlist" });
            }
            wishlist.products.push(productId);
        }
        
        await wishlist.save();
        await wishlist.populate('products', 'product_name discounted_price img_link category');
        
        res.json({ message: "Product added to wishlist", wishlist });
    } catch (error) {
        res.status(500).json({ message: "Error adding to wishlist", error: error.message });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        
        const wishlist = await WishlistModel.findOne({ userId: req.user._id });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        
        wishlist.products = wishlist.products.filter(
            product => product.toString() !== productId
        );
        
        await wishlist.save();
        await wishlist.populate('products', 'product_name discounted_price img_link category');
        
        res.json({ message: "Product removed from wishlist", wishlist });
    } catch (error) {
        res.status(500).json({ message: "Error removing from wishlist", error: error.message });
    }
};

const clearWishlist = async (req, res) => {
    try {
        const wishlist = await WishlistModel.findOne({ userId: req.user._id });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        
        wishlist.products = [];
        await wishlist.save();
        
        res.json({ message: "Wishlist cleared successfully", wishlist });
    } catch (error) {
        res.status(500).json({ message: "Error clearing wishlist", error: error.message });
    }
};

export {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist
}; 