import { OrderModel } from "../../../db/models/order.js";
import { CartModel } from "../../../db/models/cart.js";
import { ProductModel } from "../../../db/models/product.js";

const createOrder = async (req, res) => {
    try {
        const { shippingAddress } = req.body;
        

        const cart = await CartModel.findOne({ userId: req.user._id })
            .populate('products.productId');
        
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        
        let totalAmount = 0;
        const orderItems = [];
        
        for (const item of cart.products) {
            const product = item.productId;
            const itemTotal = product.discounted_price * item.quantity;
            totalAmount += itemTotal;
            
            orderItems.push({
                productId: product._id,
                quantity: item.quantity,
                price: product.discounted_price
            });
        }
        
   
        const order = new OrderModel({
            userId: req.user._id,
            items: orderItems,
            totalAmount,
            shippingAddress
        });
        
        await order.save();
        await order.populate('items.productId', 'product_name img_link');
        
        
        cart.products = [];
        await cart.save();
        
        res.status(201).json({ 
            message: "Order created successfully", 
            order 
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({ userId: req.user._id })
            .populate('items.productId', 'product_name img_link')
            .sort({ createdAt: -1 });
        
        res.json({ message: "Orders retrieved successfully", orders });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving orders", error: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await OrderModel.findOne({ 
            _id: req.params.id, 
            userId: req.user._id 
        }).populate('items.productId', 'product_name img_link');
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        
        res.json({ message: "Order retrieved successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving order", error: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }
        
        const order = await OrderModel.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('items.productId', 'product_name img_link');
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        
        res.json({ message: "Order status updated successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Error updating order status", error: error.message });
    }
};

export {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus
}; 