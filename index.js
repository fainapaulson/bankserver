// import express
const express=require('express')
// import logic file
const logic=require('./service/logic')
// app creation
const app=express()

// integrate frontend with server
const cors=require('cors')
app.use(cors({origin:'http://localhost:4200'}))

// to convert all incoming json data to js
app.use(express.json())

// import jwt
const jwt=require('jsonwebtoken')

const jwtMiddleWare=(req,res,next)=>{
    console.log("....middleware....");
    
  try { // access token from request header
    const token=req.headers['access_token']

    // verify
    const data=jwt.verify(token,"secretkey123")
    console.log(data);
    next()
   }
   catch{
    res.status(404).json(
        {
            statusCode:404,
            status:false,
            message:"please login"
        }
    )
   }
}


// register
app.post('/register',(req,res)=>{
logic.register(req.body.acno,req.body.uname,req.body.psw).then(result=>{
    res.status(result.statusCode).json(result)
})
})

// login
app.post('/login',(req,res)=>{
logic.login(req.body.acno,req.body.psw).then(result=>{
    res.status(result.statusCode).json(result)
})
})


// app.get('/getdata',(req,res)=>{
//     console.log(req.body.acno);
//     // res.send("get method.....")
//     res.json(req.body.acno)
// })

// balance
app.get('/balance/:acno',jwtMiddleWare,(req,res)=>{
    logic.getBalance(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)
    
    })
})
// // single user
app.get('/getUser/:acno',jwtMiddleWare,(req,res)=>{
    logic.getUser(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)
    
    })
})
// fund transfer
app.post('/transfer',jwtMiddleWare,(req,res)=>{
   logic.fundTransfer(
    req.body.toAcno,
    req.body.fromAcno,
    req.body.amount,
    req.body.psw,
    req.body.date)
.then(result=>{
    res.status(result.statusCode).json(result)
})

   } 
)

app.get('/transaction/:acno',jwtMiddleWare,(req,res)=>{
    logic.getTransaction(req.params.acno).then(result=>{
    res.status(result.statusCode).json(result)    
    })
})

app.delete('/deleteAc/:acno',jwtMiddleWare,(req,res)=>{
    logic.deleteAc(req.params.acno).then(result=>{
    res.status(result.statusCode).json(result)    
   })
})
// port set
app.listen(3000,()=>{
    console.log("server started at port 3000");
})