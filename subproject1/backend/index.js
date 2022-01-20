const express=require("express");
const cors=require("cors")
const mongoose=require("mongoose");
const Registered = require("./model/user");
const cookieParser = require('cookie-parser')
const jwt=require("jsonwebtoken")
mongoose.connect("mongodb://localhost:27017/LoginAndRegister");
const path = require('path');
const app=express();
app.use(express.json())
app.use(cors());
app.use(cookieParser())

const port=process.env.PORT||9002;
app.get("/",(req,res)=>{
    res.send("hello tamanna")
})

app.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    console.log("back",{name,email,password})
    try{
        const User1=await Registered.findOne({email:req.body.email});
            
            if (User1 && User1.email===req.body.email){
                res.send({message:"User already Exist"})
            }else{ 
                const user=new Registered({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    
                    res.send({message:"Successfully registered"})
                }
            })
              

        }
            
    }
    catch(err){
        console.log(err)
    }
    
     
          


   
   
});
    
   

       

app.post("/login",async(req,res)=>{
    console.log(req.body)
    try{
        const email=req.body.email;
        const password=req.body.password;
        console.log("pass",req.body.email)
        const userEmail= await Registered.findOne({email:req.body.email});
        console.log("user:",userEmail.email)
        if(userEmail.password===req.body.password){
            try{
                const token = await jwt.sign(req.body, "mynameistamanna10xacademyjunejanuary",{ expiresIn: '1d' });
                res.cookie('authcookie',token,{maxAge:900000,httpOnly:true})
                console.log(token)
                res.send({message:"Login Successfully",jwttoken:token,user:userEmail})

            }catch(err){
                console.log(err)
            }
    

            
           

        }else{
            res.send({message:"Incorrect Password"})
        }
        
    }catch(err){
        res.send({message:"User not register"})
    }

    
  

    
})
app.post('/auth', (req, res) => {
    const token = req.body.token;
    console.log("get from client",token)
  
    // If the token is present
    if(token){
  
        // Verify the token using jwt.verify method
        const decode = jwt.verify(token, 'mynameistamanna10xacademyjunejanuary');
        console.log("decoded",decode)
        //res.send({data:"user verified"})
  
        //  Return response with decode data
        res.send({
            login: true,
            detail: decode
        });
    }else{
  
        // Return response with error
        res.send({
            login:false,
            detail: 'access denied'
        });
    }
});



app.listen(port,()=>{
    console.log(`server running at port ${port}`)

})

