const Project = require("../model/Project")
const fs = require("fs")
const path = require("path")
// Add Project
const addProject =async(req,res)=>
{
     try{
          const{Title,Description,Technologies}= req.body
          const Image = req.file
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : null;

        const project = new Project({Title,Description,Technologies,Image})
        await project.save()
        res.send(project)
     }
     catch(err)
     {
        res.send(err.message)
     }
}


// Get All Project
const getProject =async(req,res)=>
{
     try{
         const project =await Project.find({})
         res.send(project)
     }
     catch(err)
     {
        res.send(err.message)
     }
}

// Delete Single Project
const delSingleProject =async(req,res)=>
{
     try{
             const id=  req.params.id
             const project = await Project.findOne({_id:id})
             if(project.Image)
             {
                const imageName = project.Image.split("/images/")[1]
                const imagePath = path.join(__dirname,"../images",imageName)

                if(fs.existsSync(imagePath))
                {
                  fs.unlinkSync(imagePath)
                }
             }
             await Project.deleteOne({_id:id})
             res.send(project)
     }
     catch(err)
     {
        res.send(err.message)
     }
}


// Delete All Project
const delProject =async(req,res)=>
{
     try{
             const projects = await Project.find({})
             
             projects.forEach((project)=>
            {
               if(project.Image)
             {
                const imageName = project.Image.split("/images/")[1]
                const imagePath = path.join(__dirname,"../images",imageName)

                if(fs.existsSync(imagePath))
                {
                  fs.unlinkSync(imagePath)
                }
             }

            })
             
             await Project.deleteMany({})
             res.send(projects)
     }
     catch(err)
     {
        res.send(err.message)
     }
}


module.exports={addProject,getProject,delSingleProject,delProject}