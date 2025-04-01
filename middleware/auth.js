const jwt=require("jsonwebtoken")

const UserAuth = async (req, res, next) => {
    try {
      const tokenWithBearer = req.headers["authorization"];
  
      if (!tokenWithBearer || !tokenWithBearer.startsWith("Bearer ")) {
        console.error("Authorization header missing or invalid");
        return res
          .status(401)
          .json({
            message: "Authorization header missing or invalid",
            success: false,
          });
      }
  
      const token = tokenWithBearer.split(" ")[1];
      // const tokenString = String(token);
      const cleanedToken = token.replace(/"/g, "");
      jwt.verify(cleanedToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
        } else if (decoded.role === "user") {
          req.id = decoded.id;
  
          next();
        }
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };


const adminAuth=async(req,res)=>{
    try {
        const tokenwithBearer=req.headers["authorization"]
        if (tokenwithBearer==undefined) {
            return res
            .status(401)
            .json({
              message: "Authorization header missing or invalid",
              success: false,
            });
        }
        const token=tokenwithBearer.split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decode)=>{
            if(err){

            }else if(decode.role=="admin"){
                req.id=decode.id;
                next()
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

module.exports={
    UserAuth,
    adminAuth
}