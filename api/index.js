import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from './routes/user.js'
import authRoutes from './routes/auth.js'
import postRoutes from './routes/post.js'
import categoryRoutes from './routes/categories.js'
import multer from 'multer'
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

//middleware
app.use(express.json());
dotenv.config();
app.use(cors());
app.use("/images",express.static(path.join(__dirname,"/images")))

// Routes
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/post",postRoutes)
app.use("/api/categories",categoryRoutes)

// uploading images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// connecting to backend server
const connection = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // it tells db to use latest features
    });
    console.log("Connected to Mongoose database");
  } catch (error) {
    console.error("error connecting to Mongoose database", error.message);
  }
};


// create a server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server listening on port " + port);
  connection();
});
