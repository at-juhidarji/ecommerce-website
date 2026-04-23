import jwt from "jsonwebtoken"
import User from "../models/User.js"
import bcrypt from "bcrypt"

const generateToken=(userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'})
    return token
}


export const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body

        if(!name || !email || !password){
            res.status(400).json({message:"Missing required fields"})
        }

        const user=await User.findOne({email})
        if(user){
            res.status(400).json({message:"User already exists"})
        }

        const hashedPassword=await bcrypt.hash(password,10)

        const newUser=await User.create({name , email ,password:hashedPassword})

        const token=generateToken(newUser._id)
        newUser.password=undefined

        return res.status(201).json({message:'User created succesfully'},token,newUser)

    }catch(err){
        return res.status(400).json({message:err.message})
    }
}
