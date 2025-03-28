const jwt=require('jsonwebtoken')
const User=require("../models/User")
const Destinations=require("../models/Destination")
const State=require("../models/State")
const path = require('path');
/*----------------AdminLogin-------------------*/
exports.adminLogin=async(req,res)=>{
    try {
        const{email,password}=req.body.data.datas
        console.log(req.body.data.datas);
        const Adminpassword=process.env.password
        const Adminemail=process.env.email
        const KEY = process.env.JWT_SECRET_KEY;
        if(email==Adminemail&&password==Adminpassword){
          const token=jwt.sign({email:Adminemail,role:"admin"},KEY,{expiresIn:"30d"})
            res.status(200).json({success:true,message:"Login Success",admindetails:token})
        }else{
            res.status(201).json({success:false,passwordnotmatch:"password or email incorrect"})
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}
/*-----------------Admin Can View all users-----------*/
exports.findUser=async(req,res)=>{
    try {
        const limit=5
        const totalItems=await User.countDocuments()
        const totalpages=Math.ceil(totalItems/limit)
        const page=parseInt(req.query.page)||1
        const skip=(page-1)*limit
        const searchItem=req.query.search
        let query={}
       
        if(searchItem){
            query.fname={$regex:new RegExp(searchItem,'i')}
        }
        const users=await User.find(query).skip(skip).limit(limit)
        res.status(200).json({success:true,users,totalpages,page})
    } catch (error) {
        res.status(500).json({success:false,message:"server error"})
    }
}
/*-----------------user Block Or UnBlock-----------*/
exports.blockORUnblock=async(req,res)=>{
    try {
        const id=req.query.id
        let findUser=await User.findById({_id:id})
    
        findUser.status=!findUser.status
        await User.findOneAndUpdate({_id:id}, 
            {$set:{status:findUser.status}}
        );
        const userdata=await User.find()
        return res.send({success:true,userdata})
    } catch (error) {
        res.status(500).json({success:false,message:"server error"})

    }
}
/*-----------------Create Banners-----------*/
exports.addStateAndDistrict=async(req,res)=>{
    try {
        
        
        const data = JSON.parse(req.body.data);
        const { statename, districtname, districtdesc } = data;
        const images=req.file.filename
       
        const stateAnddistrictdatas=new State({
            statename,
            districtname,
            districtdesc,
            image:images
        })
        
        await stateAnddistrictdatas.save()
        
        res.status(200).json({success:true})
    } catch (error) {
        res.status(500).json({success:false,message:"server error"})
    }
}

exports.findstateAndDistrict=async(req,res)=>{
    try {
        const limit=5
        const totalItems=await State.countDocuments()
        const totalpages=Math.ceil(totalItems/limit)
        const page=parseInt(req.query.page)||1
        const skip=(page-1)*limit
        const searchItem=req.query.search
        let query={}
       
        if(searchItem){
            query.districtname={$regex:new RegExp(searchItem,'i')}
        }
        const statedata=await State.find(query).skip(skip).limit(limit)
        
        res.status(200).json({success:true,statedata,totalpages,page})
    } catch (error) {
        res.status(500).json({success:false,message:"server error"})

    }
}
exports.StateBlockOrunBlock=async(req,res)=>{
    try {
        const stateId=req.query.id
        const findstate=await State.findById({_id:stateId})
        findstate.status=!findstate.status
        await State.findOneAndUpdate({_id:stateId}, 
            {$set:{status:findstate.status}}
        );
        const Statesdata=await State.find()
        res.status(200).json({success:true,Statesdata})

    } catch (error) {
        res.status(500).json({success:false,message:"server error"})

    }
}
exports.StateAndDistrictDelete=async(req,res)=>{
    try {
        const Id=req.query.id
        await State.deleteOne({_id:Id})
        const Statedata=await State.find()
        res.send({success:true,Statedata})
    } catch (error) {
        res.status(500).json({success:false,message:"server error"})

    }
}
exports.editStateAndDistrict=async(req,res)=>{
    try {
        
        const data = JSON.parse(req.body.data);
        console.log(JSON.parse(req.body.data))

        const id=data._id
        const value=await State.findById({_id:id})
       
        const { statename, districtname, districtdesc,image } = data;
        
        const img = path.basename(image);
        await State.findByIdAndUpdate({_id:id},
            {$set:{
                statename,
                districtname,
                districtdesc,
                image:img
            }}
        )
        res.status(200).json({success:true})

    } catch (error) {
        res.status(500).json({success:false,message:"server error"})

    }
}
exports.adddestinations=async(req,res)=>{
    try {
       
        
        const data = JSON.parse(req.body.data);
        
        const{destination,duration,description,includes,notIncludes,ticketPrice,district}=data
        const images = req.files ? req.files.map(file => file.filename) : [];

        console.log(images,"imagesimages");
        
        const alldatas=new Destinations({
            destination,
            duration,
            description,
            includes,
            notIncludes,
            ticketPrice,
            districtname:district,
            selectedImages:images

     } )
     await alldatas.save()
     res.status(200).json({success:true,message:"datas submited"})
        
    } catch (error) {
        res.status(500).json({success:false,message:"server error"})

    }
}

exports.Finddestinations=async(req,res)=>{
    try {
         const limit=5
         const totalItems=await Destinations.countDocuments()
         const totalpages=Math.ceil(totalItems/limit)
         const page=parseInt(req.query.page)||1
         const skip=(page-1)*limit
         const searchItem=req.query.search
         let query={}
         if(searchItem){
            query.destination={$regex:new RegExp(searchItem,'i')}
         }
        const finddestinations=await Destinations.find(query).skip(skip).limit(limit)
        console.log(finddestinations);
        res.status(200).json({success:true,finddestinations,totalpages,page})
        
    } catch (error) {
        res.status(500).json({success:false,message:"server error"})
    }
}

exports.finddistrict=async(req,res)=>{
    try {
        const finddistrict = await State.find();
       console.log(finddistrict);
       
        
       const datas=finddistrict.map(value=>value.districtname)
        
        res.status(200).json({success:true,datas,finddistrict})
        
    } catch (error) {
        res.status(500).json({success:false,message:"server error"})

    }
}