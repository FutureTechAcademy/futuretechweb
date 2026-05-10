const jwt = require("jsonwebtoken")


const authMiddleware = async(req,res,next)=>
{
   try
   {
      const authHeader= req.headers.authorization
       if (!authHeader) {
            return res.json({ message: "Token required" });
        }
       const token=authHeader
       const decoded = jwt.verify(token,process.env.SECRET_KEY)
       next()
       
   }
   catch(err)
   {
    res.send(err.message)
   }
}

module.exports=authMiddleware