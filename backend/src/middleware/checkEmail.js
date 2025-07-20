import { userModel } from "../../db/models/user";
import bcrypt from 'bcrypt'


export const checkEmail = async (req,res,next)=> {
    let foundedUser = await userModel.findOne({email:req.body.eamil})
    if(foundedUser) return res.status(409).json({message:"Already exist, please login"})
    
        req.body.password = bcrypt.hashSync(req.body.password,8);
        next()
}