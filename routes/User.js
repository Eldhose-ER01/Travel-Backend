const express=require('express')
const userRoutes=express()
const userController=require('../controllers/User')

userRoutes.post('/signup',userController.userSignupOtp)
userRoutes.post('/otpsubmit',userController.userSignup)
userRoutes.post('/resendotp', userController.ResendOtp);
userRoutes.post('/login',userController.userLogin)
userRoutes.post('/forgetotp',userController.forGetOtp)
userRoutes.post('/forgetotpsubmit',userController.forgetOtpsubmit)
userRoutes.post('/passwordcahnge',userController.changePassword)
userRoutes.post('/googlelog',userController.googleLogin)




module.exports=userRoutes