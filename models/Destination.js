const mongoose=require('mongoose')
const destinationschema=new mongoose.Schema({
    destination:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    includes:{
        type:[String],
        default:[]

    },
    notIncludes:{
        type:[String],
        default:[]
    },
    districtname:{
        type:String
    },
    ticketPrice: {
        type: Number, 
        required: true
    },
    selectedImages: {
        type: [String], 
        default: []
    }
})
module.exports=mongoose.model('Destinations',destinationschema)