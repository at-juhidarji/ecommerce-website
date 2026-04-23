
import express from "express";
import connectDb from "./config/db.js";
import "dotenv/config";
import userRouter from "./routes/auth.routes.js";

const app=express()
const port=5000

connectDb()
app.use(express.json())

app.use("/api",userRouter)

app.listen(port,()=>{
    console.log("server is running...")
})  

