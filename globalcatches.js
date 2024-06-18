const express=require("express")
const app=express();

app.use(express.json());

app.post('/',function(req,res){
    const kidneys=req.body.kidneys
    const length=kidneys.length
    res.send("Your kindey size is "+length)
})

// if the below middleware is not used then when ever there is an error 
// like if the body is not we want etcc then the whole error is exposed to the user he can see since our backend is live
// hence to avoid that we need to keep the below every time so to handle crashes 

// express will recognize this as error return something since it has 4 functions 
app.use(function(error,req,res,next){
    console.log(err) // you can see error 
    res.status(503).json("something is wrong with our server")
})

app.listen(8001)