const express=require("express")
const app=express()

// ugly way of handling prechecks 
// app.get('/health',function(req,res){
//     const kidneyId=req.query.kidneyId
//     const username=req.headers.username
//     const password=req.headers.password

//     if(kidneyId!=1 && kidneyId!=2)
//     {
//         res.status(411).json({
//             msg:"wrong inputs",
//         });
//         return ;
//     }
//     if(username!="vamshi" || password!="password12")
//     {
//         res.status(403).json({
//             msg:"User Doesn't exist"
//         })
//         return ;
//     }
//     res.json({
//         msg:"You are completely fine!!"
//     })
// })

// what if you want to hit some other route say /health-check or some other method say post , put and do some logic !!
// But before you do that logic you need to verify authenticaion and few prechecks which are same ditto as above ?
// The ugly way is to copy the same thing again and after that verification do some logic below !! you can use function also !!
// But the optimal way is to do it by middlewares !! (avoid lot of a=ugly code !!) 


function kidneycheck(req,res,next)
{
    const kidneyId=req.query.kidneyId
    if(kidneyId!=1 && kidneyId!=2)
    {
        res.status(411).json({
            msg:"Wrong inputs"
        })
    }
    else
    next()

}
function usercheck(req,res,next)
{
    const username=req.headers.username
    const password=req.headers.password
    if(username!="vamshi" || password!="vamshi12")
    {
            res.status(403).json({
                msg:"User Doesn't exist"
            })
    }
        else
        next()
}

app.use(express.json()) // basically it is a middleware !!
// For query parameter and headers you don't need this but if the request is body then it might me txt , json , etcc
// we need to ensure that it is json only !! for that we use that 
// app.use(function/some ) .. to all the methods below it will be applicable 
// for example in below just above the get you write app.use(kidneycheck) then in get you needn't specify that middleware again 
// but to only below it calls it will be available 
app.get('/health-check',kidneycheck,usercheck,function(req,res){
    res.json({
        msg:"You are abosolutely fine!!"
    })
})
app.listen(8000)
