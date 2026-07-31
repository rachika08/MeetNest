import dotenv from "dotenv";

dotenv.config();
// console.log("ENV CHECK:", process.env.GEMINI_API_KEY);
import express from "express";
import {createServer} from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connect } from "node:http2";
import { connectToSocket } from "./controllers/socketManagers.js";
import userRoutes from "./routes/users.routes.js";
import testRoutes from "./routes/test.routes.js";

const app=express();//creates app
const server=createServer(app);//creates http server
const io=connectToSocket(server);//attaches socket.io to that server


app.set("port", process.env.PORT||8000);
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));


app.use("/api/v1/users",userRoutes);
app.use("/api/v1/test",testRoutes);
// app.use("/api/v1/users/t",testRoutes);

const start=async()=>{
    const connectionDb=await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongo connected db host ${connectionDb.connection.host}`)
    server.listen(app.get("port"),()=>{
    console.log("listening at port 8000")})}

start();   