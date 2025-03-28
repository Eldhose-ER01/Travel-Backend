const nodemailer=require('nodemailer')
const otpGenerator=require('otp-generator')

let globalotp = null;
function sMail(email, otp) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Your OTP",
    text: `This is your OTP${otp}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
    }
  });
}
/*---------------------------OTP Generate Function---------------------------------*/
const sendotp = async (email) => {
  const otp = otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  await sMail(email, otp);
  return otp;
};

module.exports={
    sendotp
}






