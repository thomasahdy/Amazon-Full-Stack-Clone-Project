import {model , Schema} from 'mongoose'

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    password: { type: String, required: true },
    age: { type: Number, min: 0 },
    role:{
        type :String,
        enum:['user','admin'],
        default:'user'
    }

},
{
    timestamps:true,
    versionKey:false
})

export const userModel = model('User',userSchema);