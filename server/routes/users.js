import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/users.js";

const router = express.Router();

router.post("/register", async(req,res)=>{
    const {username, password} = req.body;
    const user  = await userModel.findOne({username});

    if(user){
        return res.json({message:"User Already Exists!"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({username:username,password:hashedPassword});
    await newUser.save();

    res.json({message:"User Registered Successfully"});
});

router.post("/login", async(req,res)=>{
    const {username, password} = req.body;
    const user = await userModel.findOne({username});
    if(!user){
        return res.json({message:"User Dosen't Exists"});
    }
    const isPassword = await bcrypt.compare(password,user.password);
    if(!isPassword){
        return res.json({message:"Username or Password is incorrect!!"});
    }

    const token = jwt.sign({id:user._id},"secret");

    res.json({token,userID:user._id});
});



export {router as userRouter};