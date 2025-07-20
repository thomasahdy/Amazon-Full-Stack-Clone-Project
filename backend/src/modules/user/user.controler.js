import { userModel } from "../../../db/models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'





const signIn = async (req,res) => {
    try {
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userData = { ...req.body, password: hashedPassword };
        
        let addedUser = await userModel.insertMany(userData);
        addedUser[0].password = undefined;
        res.status(201).json({message:"added successfully", addedUser})
    } catch (error) {
        res.status(500).json({message: "Error creating user", error: error.message})
    }
 }




const logIn = async (req,res) => {
    let foundedUser = await userModel.findOne({email:req.body.email})
    if(foundedUser){
        let passwordcheck = bcrypt.compareSync(req.body.password, foundedUser.password)
        

        if(passwordcheck){
            let token = jwt.sign({_id:foundedUser._id,role:foundedUser.role},"key")
            return res.json({message: `Welcom ${foundedUser.name}`,token })
        }else{
            res.status(422).json({message: "Wrong password"})
        }
    }else{
        res.status(404).json({message:"User not found"})
    }
}




export {
    logIn,
    signIn,
}