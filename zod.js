const express=require("express")
const zod=require("zod")
const app=express()

app.use(express.json());

// const arraycheckschema=zod.array(zod.number())
function checkvalid(obj) {
    const emailpassword = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8)
    });
    const response = emailpassword.safeParse(obj);
    return response;
}
// app.post('/',function(req,res){
//     // const kidney=req.body.kidney
//     const obj2=req.body.obj2
//     const replay2=emailpassword.safeParse(obj2)
//     // const replay=arraycheckschema.safeParse(kidney)
//     res.json({
//         replay2
//     })
// })

app.post('/login', function(req, res) {
    const checker = checkvalid(req.body);
    if (!checker.success) {
        return res.status(400).json({
            msg: "Some issue from your side",
        });
    }

    res.json({
        msg: "Validation successful",
    });
});


app.listen(3001)