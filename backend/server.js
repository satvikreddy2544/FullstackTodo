const express = require("express");
const app = express();
const zod = require("zod");
const jwt =  require("jsonwebtoken");
const mongoose = require("mongoose");
const exp = require("constants");
const cors = require("cors");
const { CommandStartedEvent } = require("mongodb");
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://sathvik:Saii2544@cluster0.ghak2da.mongodb.net/newSignup");

const User = mongoose.model("Users",{username:String,password:String});

const userNameZod = zod.string().min(4).max(12);
const passwordZod = zod.string().min(6).max(10);
app.post("/signup",async (req,res,next)=>{

    const {username,password} = req.body;
    console.log(username,password);
    if(!userNameZod.safeParse(username).success){
       return res.status(412).json({
            msg:"please check username"
        })
    }
    if(!passwordZod.safeParse(password).success){
      return  res.status(412).json({
            msg:"please check password"
        })
    }
    
    const isExist = await User.findOne({username:username});

    if(isExist){

        return res.status(411).json({
            msg:"user already exist"
        })
    }else{
        const user = new User({username,password});
        user.save().then(()=>console.log(`user added ${user}`));
        return res.status(200).json({
            msg:'user added'
        })
    }

})

app.post("/login",async (req,res,next)=>{


    const {username,password} = req.body;
    console.log(username,password);
    const isExist = await User.findOne({username:username});

    if(!isExist){

        return res.status(411).json({
            msg:"user not exist"
        })
    }else{

        console.log(isExist);
        if(isExist.username === username && isExist.password === password){
        const token = jwt.sign({username:username},"password");
        // console.log(token);
        res.status(200).json({
            token
        })
    }else{

        res.status(411).json({
            msg:"incorrect crendentials",
        })
    }

    }

    
})

app.listen(3001,()=>{
    console.log(`server started at 3001`);
})