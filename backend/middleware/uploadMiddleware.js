const multer = require("multer")
// Make File Storage
const storage = multer.diskStorage({
    destination:(req,file,cb)=>
    {
        cb(null,"images")
    },
    filename:(req,file,cb)=>
    {
          const fileName=Date.now()+"-"+file.originalname
          cb(null,fileName)
    }

})

//Create File Middleware
const upload = multer(
    {
        storage:storage,
        limits:{fieldSize:1024*1024*20}
    }
)

module.exports=upload