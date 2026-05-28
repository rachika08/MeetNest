import httpStatus from "http-status";
import {User} from "../models/user.model.js";
import bcrypt from "bcrypt";
import {hash} from "bcrypt";
import crypto from "crypto";


const login=async(req,res)=>{
    const {username,password}=req.body;
    if(!username || !password){
        return res.status(400).json({message:"please provide info"});
    }
    try {
        const user= await User.findOne({username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message:"user not found"});
        }
        let isPasswordCorrect=await bcrypt.compare(password,user.password);
        console.log("Entered password:", `"${password}"`);
        console.log("Length:", password.length);
        if(isPasswordCorrect){
            let token=crypto.randomBytes(20).toString("hex");
            user.token=token;
            await user.save();
            return res.status(httpStatus.OK).json({token:token});
        }else{
            return res.status(httpStatus.UNAUTHORIZED).json({message:"Invalide Username or password"})
        }
    } catch (e) {
        return res.status(500).json({message:`something went wrong ${e}`});
    }
};



const register= async (req,res)=>{
    const {name,username,password}=req.body;
    try{
        const existingUser=await User.findOne({username});
        if(existingUser){
            return res.status(httpStatus.FOUND).json({message:"user already existed"});

        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({
            name:name,
            username:username,
            password:hashedPassword
        })
        await newUser.save()
        res.status(httpStatus.CREATED).json({message:"user created"})
    }catch(e){
        return res.json({message:`Something went wrong ${e}`});
    }
}

export {login , register};