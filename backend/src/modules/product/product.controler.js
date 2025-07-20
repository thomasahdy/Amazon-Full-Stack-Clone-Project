import { ProductModel } from "../../../db/models/product.js";
import jwt from 'jsonwebtoken'

const getproduct = async (req,res)=>{
    try {
        const { 
            page = 1, 
            limit = 10, 
            search, 
            category, 
            minPrice, 
            maxPrice,
            sortBy = 'product_name',
            sortOrder = 'asc'
        } = req.query;
        
        // Build filter object
        const filter = {};
        
        if (search) {
            filter.$or = [
                { product_name: { $regex: search, $options: 'i' } },
                { about: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (category) {
            filter.category = { $in: [category] };
        }
        
        if (minPrice || maxPrice) {
            filter.discounted_price = {};
            if (minPrice) filter.discounted_price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.discounted_price.$lte = parseFloat(maxPrice);
        }
        
        // Build sort object
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        
        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const products = await ProductModel.find(filter)
            .sort(sort)
            .limit(parseInt(limit))
            .skip(skip);
            
        const total = await ProductModel.countDocuments(filter);
        
        res.json({
            message: "Products retrieved successfully", 
            products,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalProducts: total,
                hasNext: skip + products.length < total,
                hasPrev: parseInt(page) > 1
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products", error: error.message });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.json({ message: "Product retrieved successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product", error: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await ProductModel.distinct('category');
        res.json({ message: "Categories retrieved successfully", categories });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving categories", error: error.message });
    }
};

const addproduct = async (req,res)=>{
    try {
        
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }
        
        let addedProduct = await ProductModel.insertMany(req.body)
        res.status(201).json({message: "Added successfully", addedProduct})
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }
        
        const updatedProduct = await ProductModel.findOneAndUpdate(
            { _id: req.params.id },
            { ...req.body },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Updated successfully", updatedProduct });

    } catch (error) {
        console.error("Update product error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
       
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }
        
        const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Deleted successfully", deletedProduct });

    } catch (error) {
        console.error("Delete product error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export {
    getproduct,
    getProductById,
    getCategories,
    addproduct,
    updateProduct,
    deleteProduct,
}