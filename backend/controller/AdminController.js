const jwt = require("jsonwebtoken")


// Admin Login 
const adminLogin = async (req, res) => {
    try {
       const {Name,Pass}=req.body 
       if(Name==process.env.ADMIN_NAME && Pass==process.env.ADMIN_PASS)
       {
        const token = jwt.sign({Name},process.env.SECRET_KEY,{expiresIn:"90d"})
        res.send({token})
       }
       else{
        res.send({msg:"Access Denied"})
       }
    }
    catch (err) {
        res.send(err.message)
    }
}

module.exports={adminLogin}