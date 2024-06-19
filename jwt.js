// Authentication 
const express=require("express")
const jwt=require("jsonwebtoken")

const app=express()
const jwtpassword="123456"
app.use(express.json());

const users=[
    {
    username:"ramu",
    password:"12345",
    email:"Ramu@gmail.com"
    },
    {
        username:"raju",
        password:"54321",
        email:"Raju@gmail.com"
    },
    {
        username:"kishor",
        password:"98765",
        email:"kishor@gmail.com"
    }
]
function userexist(username,password)
{
    for(let i=0;i<users.length;i++)
    {
        if(users[i]["username"]===username && users[i]["password"]===password)
            return true;
    }
    return false;
}
app.post('/sign-in',function(req,res){
    const username=req.body.username;
    const password=req.body.password
    if(!userexist(username,password))
    {
        res.status(403).json({
            msg:"User Doesn't exist"
        })
        return ;
    }
    // With the jwtpassword we can create a sign (Token for that user name)
    let token = jwt.sign({username:username},jwtpassword);
    return res.json({
        token,
    });
});

app.get('/user-data',function(req,res){
    const token=req.headers.authorization;
    // we need to verify the token with our password(jwtpassword)
    const decoded=jwt.verify(token,jwtpassword);
    const username=decoded.username;
    res.json({
        exceptthatuser:users.filter(function(value){
            if(value.username===username)
                return false;
            else
                return true;
        })
    });
}); 


app.listen(3000)