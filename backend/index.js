import path from "path"
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

dotenv.config();
const port = process.env.PORT || 6000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

//get endpoint
app.get('/bfhl',(req,res)=>{
    res.json({
        operation_code:1
    })
});

//post endpoint
app.post('/bfhl',(req,res)=>{
    const {data} = req.body;
    if( !data || !Array.isArray(data)){
        return res.status(400).json({
            is_success:false,
            user_id:"",
            email:"",
            roll_number:"",
            numbers:[],
            alphabets:[],
            highest_alphabet:[]
        });
    }

    const user_id = "john_doe_17091999";
    const email = "john@xyz.com"; 
    const roll_number = "ABCD123"; 
  
    const numbers = data.filter(item => !isNaN(item) && item.trim() !== '');
    const alphabets = data.filter(item => isNaN(item) && item.trim() !== '');
    const highest_alphabet = alphabets.length > 0 ? [alphabets.sort()[alphabets.length - 1]] : [];
    
    res.json({
        is_success:true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_alphabet
    });

});

app.listen(port,()=>{
    console.log("Server running on port:",port);
})