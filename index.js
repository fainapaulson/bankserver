// import express
const express=require('express')

// app creation
const app=express()

// port set
app.listen(3000,()=>{
    console.log("server started at port 3000");
})