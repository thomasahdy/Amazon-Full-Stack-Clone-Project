import mongoose from 'mongoose'

export const dbConnection = mongoose.connect("mongodb://localhost:27017/Amazon")
.then(()=>console.log("dbConnected")).catch((err)=>console.log(err))