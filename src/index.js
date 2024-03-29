import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/dataBase.js"
import dotenv from "dotenv"
import app from "./app.js";
dotenv.config({
    path: './.env'
}) 

connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running at port ${process.env.PORT}`);
    })
    app.on("error",(error)=>{
        console.log("ERROR:",error);
        throw error
       }) 
})
.catch((err)=>{
    console.log("MONGO DB CONECTIO FAILED !!!!",err)
})

/**First approach */
/*import express from "express";
(async()=>{
    try{ 
await mongoose.connect(`${process.env.MOGODB_URL}/{DB_NAME}`)
   application.on("error",(error)=>{
    console.log("ERROR:",error);
    throw error
   }) 
}catch(error){
        console.error("Error",error);
        throw error;
    }
})()*/