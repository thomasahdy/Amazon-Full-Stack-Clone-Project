import {model , Schema} from 'mongoose'

const ProductSchema = new Schema({
    product_name:String,
    product_id:String ,
    category: [String],
    discounted_price:Number,
    actual_price:Number,
    discount_percentage:Number,
    rating: Number,
    ratingCount: Number,
    about: String,
    img_link: String,

},
{
    timestamps:true,
    versionKey:false
})

export const ProductModel = model('Product',ProductSchema);