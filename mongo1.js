const express=require("express")
const mongoose=require("mongoose")
const app=express()

app.use(express.json())
mongoose.connect("mongodb+srv://vamshicode7:Axt6MODODqpB9JDx@cluster0.akkcce9.mongodb.net/")

const User=mongoose.model('users',{
    name:String,
    email:String,
    password:String
})

app.post('/sign-up',async function(req,res){
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;

    const existinguser= await User.findOne({email:email})
    if(existinguser)
    {
        return res.status(200).send("username already exist")
        return ;
    }
    const user=new User({
    name:name,
    email:email,
    password:password
    })
    user.save();
    res.json({
        msg:"User created successfully"
    })
})

app.listen(3000)

