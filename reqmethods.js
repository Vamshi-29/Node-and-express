const express=require("express")
const a=express()
a.use(express.json())
const user=[{
    user_name:"john",
    user_kidneys:[{
        healthy:false
    },
    {
        healthy:true
    }]
}]

a.get('/',function(req,res){
    const name=user[0]["user_name"]
    const nok=user[0]["user_kidneys"].length
    let nokhealthy=0;
    let nokunhealth
    for(let i=0;i<nok;i++)
    {
            if(user[0]["user_kidneys"][i]["healthy"])
                nokhealthy++;
    }
    nokunhealth=(nok-nokhealthy)
    res.json(
        {
            name,
            nok,
            nokhealthy,
            nokunhealth
        }
    )
})

a.post('/',function(req,res){
    const ishealthy = req.body.ishealthy
    user[0]["user_kidneys"].push(
        {
            healthy:ishealthy
        })
        res.json({
            msg:"donee!!"
        })

})

a.put('/',function(req,res){
    for(let i=0;i<user[0]["user_kidneys"].length;i++)
    {
        user[0]["user_kidneys"][i]["healthy"]=true
    }
    res.json({
        msg:"Put Donee"
    })
})

a.delete('/',function(req,res){
    new_kidneys2=[]
    for(let i=0;i<user[0]["user_kidneys"].length;i++)
        {
            if(user[0]["user_kidneys"][i]["healthy"])
                {
                    new_kidneys2.push({
                        healthy:true
                    })
                }
        }
        user[0]["user_kidneys"]=new_kidneys2
        res.json({})
})

a.listen(3001)