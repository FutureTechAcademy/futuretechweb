const Trainer = require("../model/Trainer")
const path = require("path")
const fs = require("fs")
// Add Trainer
const addTrainer = async(req,res)=>
{
  try{
      const {Name,Role,Skills,Experience}=req.body
      const Photo= req.file
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : null;
      const trainer = new Trainer({Name,Role,Skills,Experience,Photo})
      await trainer.save()
      res.send(trainer)
  }
  catch(err)
  {
    res.send(err.message)
  }
}


// get Trainer
const getTrainer = async(req,res)=>
{
  try{
      const trainers=await Trainer.find({})
      res.send(trainers)
  }
  catch(err)
  {
    res.send(err.message)
  }
}


// Delete Single Trainer
const delSingleTrainer = async(req,res)=>
{
  try {
  
          const id = req.params.id;
          const trainer= await Trainer.findById({ _id: id });
  
          if (!trainer) {
              return res.send({ message: "Trainer not found" });
          }
  
          if (trainer.Photo) {
              const imageName = trainer.Photo.split("/images/")[1];
              const imagePath = path.join(__dirname, "../images", imageName);
  
              if (fs.existsSync(imagePath)) {
                  fs.unlinkSync(imagePath);
              }
          }
          await Trainer.deleteOne({ _id: id });
          res.send(trainer)
      }
      catch (err) {
          res.send(err.message)
      }
}


//Delete All Trainer 
const delAllTrainer = async (req, res) => {
    try {
        const trainer= await Trainer.find({})
        await Trainer.deleteMany({})

       trainer.forEach((tra) => {
            if (tra.Photo) {
                const imageName = tra.Photo.split("/images/")[1];
                const imagePath = path.join(__dirname, "../images", imageName);

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
        })
        res.send(trainer)
    }
    catch (err) {
        res.send(err.message)
    }
}


module.exports={addTrainer,getTrainer,delSingleTrainer,delAllTrainer}