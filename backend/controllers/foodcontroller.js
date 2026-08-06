import foodModel from "../models/foodmodel.js";
import { cloudinary } from "../config/cloudinary.js";

// add food item

const addFood = async (req,res)=>{
    
   // Cloudinary returns the URL in req.file.path
   let image_url = req.file.path;

   const food = new foodModel({
    name : req.body.name,
    description : req.body.description,
    price : req.body.price,
    category : req.body.category,
    image : image_url
   })

   try {
    await food.save();
    res.json({success:true,message : "Food item added successfully"})
   } catch (error) {
    console.log(error);
    res.json({success:false,message : "Error in adding food item"})
    
   }

}

//all food list
const listFood = async (req,res)=>{
   try {
    const foods = await foodModel.find({});
    res.json({success:true,data:foods})
   } catch (error) {
    console.log(error);
    res.json({success:false,message:'Error'}) 
   }
}

//remove food item
const removeFood = async (req,res)=>{
     try {
        const food = await foodModel.findById(req.body.id);
        
        // Delete image from Cloudinary
        if (food.image) {
            // Extract public_id from Cloudinary URL
            const urlParts = food.image.split('/');
            const folderAndFile = urlParts.slice(-2).join('/'); // e.g. "food-delivery/filename"
            const publicId = folderAndFile.split('.')[0]; // remove extension
            await cloudinary.uploader.destroy(publicId);
        }

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Food removed"})
     } catch (error) {
        console.log(error);
      res.json({success:false,message:"Error"})  
     }
}


export {addFood,listFood,removeFood};