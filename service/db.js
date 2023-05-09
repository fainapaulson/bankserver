// import mongoose
const mongoose=require('mongoose')
// connection string
mongoose.connect('mongodb://localhost:27017/bankServer',{useNewUrlParser:true})
// model
const User=mongoose.model('User',
{
    acno:Number,
    uname:String,
    psw:String,
    balance:Number,
    transactions:[]
})
// export
module.exports={
    User
}