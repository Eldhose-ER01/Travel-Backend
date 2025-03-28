const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {sendotp}=require('../otp/otp')


/****************************userSend the OTP***************************** */
let otp=null
const userSignupOtp = async (req, res) => {
    try {
      console.log("otp user");
      
      const {email} = req.body.data;
      const userExists = await User.findOne({ email: email });
  
      if (!userExists) {
         otp = await sendotp(email);
        res.status(200).json({ success: true, message: "OTP sent successfully", otp: otp });
      } else {
        res.status(201).json({ success: false, message: "Email already exists" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  };
  /*****************User Click the resend otp--------------*/
const ResendOtp = async (req, res) => {
  try {
    const { email } = req.body.data.userdetails;
    await User.findOne({ email: email });
    sendotp(email);
    res.status(200).json({ success: true, message: "resend" });
  } catch (error) {
    console.log(error.message);
  }
};
  
  /****************************userDetils saved***************************** */
const userSignup=async(req,res)=>{
  try {
    console.log("ttoototootototoo");
    
   const userotp=req.body.data.otp
   const {fname,lname,mob,email,password}=req.body.data.userdetails;
  
   const convertotp = Object.values(userotp).join('').toString().replace(/,/g, '');
   const hashpassword = await bcrypt.hash(password, 10);
    if(otp==convertotp){
      const userdata=new User({
        fname,
        lname,
        mob,
        email,
        password:hashpassword
      })
      await userdata.save()
      
      res.status(200).json({success:true,message:"details saved"})
    }else{
      res.status(201).json({success:false,messages:"Wrong OTP"})
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });

  }
}
/****************************userLogin***************************** */
const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body.data;
    console.log(req.body.data);

    const userDetails = await User.findOne({ email: username });
    if (!userDetails) {
      return res.status(200).json({ success: false, notfound: "notfound" });
    }

    if (userDetails.status === false) {
      return res.status(200).json({ success: false, Block: "Block" });
    }

    const passwordMatch = await bcrypt.compare(password, userDetails.password);

    if (!passwordMatch || userDetails.email !== username) {
      return res.status(200).json({ success: false, incorrectdatas: "incorrectdatas" });
    }

    const token = jwt.sign({ id: userDetails._id, role: "user" }, process.env.JWT_SECRET_KEY, { expiresIn: "19d" });
    const data = {
      username: `${userDetails.fname} ${userDetails.lname}`,
      token: token,
      id: userDetails._id,
    };
    return res.status(200).json({ success: true, userDatas: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
/*------------------------Forget Password----------------------*/
const forGetOtp=async(req,res)=>{
  try {
    const {email}=req.body.data
      otp = await sendotp(email);
      console.log(otp);
      res.status(200).json({success:true})
    }
    
   catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong" });

  }
}
const forgetOtpsubmit=async(req,res)=>{
  try {
    const details=req.body.data
    console.log(details);
    const convertotp = Object.values(details.otp).join('').toString().replace(/,/g, '');
    if(otp==convertotp){

      res.status(200).json({success:true,message:"success"})

    }else{
      res.status(201).json({success:false,wrongotp:"WrongOtp"})
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });

  }
}
const changePassword=async(req,res)=>{
  try {
    const {email,password}=req.body.data
    const haspassword=await bcrypt.hash(password,10)
    const passwordUpdate=await User.updateOne({email:email},
      {$set:{
        password:haspassword,
      }}

    )
    if(passwordUpdate){
      res.status(200).json({success:true})
    }else{
      res.status(403).json({success:false})
    }

    
  } catch (error) {
    console.log(error);
  }
}

/****************Google Login ******/
const googleLogin = async (req, res) => {
  try {
    console.log("1111111111111111");
    const { email, given_name, family_name } = req.body.data;

    // Check if required fields are present
    

    const userExists = await User.findOne({ email: email });
   
    if (!userExists) {
     
      const userdata = new User({
        fname: given_name,
        lname: family_name,
        email: email,
      });
      await userdata.save();
      const token = jwt.sign({ id: userdata._id, role: "user" }, process.env.JWT_SECRET_KEY, { expiresIn: "19d" });
    const data = {
      username: `${userdata.fname} ${userdata.lname}`,
      token: token,
      id: userdata._id,
    };
      res.status(200).json({ success: true ,userDatas:data});
    } else {
      res.send({ success: false, Exit: "User already exists" });
    }
  } catch (error) {
    console.error("Error during Google login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


module.exports={
    userSignupOtp,
    userSignup,
    ResendOtp,
    userLogin,
    forGetOtp,
    forgetOtpsubmit,
    changePassword,
    googleLogin

}