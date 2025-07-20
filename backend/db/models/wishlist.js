import {model , Schema} from 'mongoose'

const wishlistSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    products: [{type: Schema.Types.ObjectId, ref: 'Product', required: true}]
}, {
    timestamps: true,
    versionKey: false
})

export const WishlistModel = model('Wishlist',wishlistSchema);