import {model , Schema} from 'mongoose'

const cartSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    products: [{
        productId: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
        quantity: {type: Number, default: 1, min: 1}
    }]
}, {
    timestamps: true,
    versionKey: false
})

export const CartModel = model('Cart',cartSchema);