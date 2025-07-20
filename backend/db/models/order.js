import {model , Schema} from 'mongoose'

const orderSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    items: [{
        productId: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
        quantity: {type: Number, required: true, min: 1},
        price: {type: Number, required: true}
    }],
    totalAmount: {type: Number, required: true},
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    }
}, {
    timestamps: true,
    versionKey: false
})

export const OrderModel = model('Order',orderSchema);