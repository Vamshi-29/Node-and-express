const express=require("express")
const a=express()

function calsum(n)
{
    let ans=0;
    for(let i=1;i<=n;i++)
        ans=ans+i;
    return ans;
    
}
a.get('/',function(req,res){
    const n=req.query.n
    const ans=calsum(n)
    res.send("heyoo Your ans is "+ans)
})
a.listen(3000)