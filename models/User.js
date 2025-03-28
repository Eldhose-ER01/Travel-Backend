const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
        fname:{
            type:String,
          
        },
        lname:{
            type:String,
           
        },
        email:{
            type:String,
            required:true,
            lowercase:true
        },
        mob:{
            type:Number,
            
        },
        password:{
            type:String,
           
        },
        status:{
            type:Boolean,
            default:true
        },
        access:{
            type:Boolean,
            default:true
        },
        address:[{
            name:{
                type:String, 
            },
            address:{
                type:String,
            
            },
            pin:{
                type:Number,
            
            },
            country:{
                type:String,
            
            },
            state:{
                type:String,
            
            },
            city:{
                type:String,
            
            },
            mob:{
                type:Number,
                
            },
            status:{type:Boolean,default:false}
        }],
        walletAmount:{
            type:Number,
            default:0
        },
        wallethistory:[{
                tdate:{type:Date},
                amount:{type:Number,default:0},
                sign:{type:String}
    }]

        

    });
    module.exports=mongoose.model("User",userSchema)