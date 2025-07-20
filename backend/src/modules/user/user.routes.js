import { signIn ,logIn } from "./user.controler.js";
import express from 'express'


export const userRoutes = express.Router()


userRoutes.post('/user/login',logIn)

userRoutes.post('/user/signin',signIn)