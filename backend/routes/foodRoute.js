import express from "express";
import { addFood,listFood,removeFood } from "../controllers/foodcontroller.js";
import multer from "multer";
import { storage } from "../config/cloudinary.js";

const foodRouter = express.Router();

//image storage engine — uses Cloudinary in production
const upload = multer({ storage: storage });

foodRouter.post('/add',upload.single('image'),addFood)
foodRouter.get('/list',listFood);
foodRouter.post('/remove',removeFood);

export default foodRouter;