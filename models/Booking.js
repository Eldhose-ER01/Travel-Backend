const mongoose=require('mongoose')

const BookingSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    destination:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Destination"
    },
    paymentMethod:{
        type:String,
       
    },
    totalAmount:{
        type:Number,

    },
    date:{
        type:Date,
    },status:{
        type:String,
        default:"booked"
    },
})