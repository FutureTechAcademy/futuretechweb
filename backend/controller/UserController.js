const User = require("../model/User")


// Post User Data
const postUser = async (req, res) => {
    try {
        const { Name, Email, Phone, Course } = req.body
        const user = await new User({ Name, Email, Phone, Course })
        await user.save()
        res.send(user)
    }
    catch (err) {
        res.send(err.message)
    }
}


// Get All User Data
const getUser = async (req, res) => {
    try 
    {
         const user = await User.find({})
         res.send(user)
    } 
    catch (err) 
    {
        res.send(err.message)
    }
}

// Delete User
const delUser = async (req, res) => {
    try {
        const user = await User.find({})
        await User.deleteMany({})
        res.send(user)
    }
    catch (err) {
        res.send(err.message)
    }
}

module.exports = { postUser, getUser,delUser }