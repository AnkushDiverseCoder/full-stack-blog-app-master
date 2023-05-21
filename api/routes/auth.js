import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const username = await User.findOne({ username: req.body.username });
    if (username) {
      return res.status(500).json("username already exists");
    }
    const email = await User.findOne({ email: req.body.email });
    if (email) {
      return res.status(500).json("email already exists");
    }
    
    const saltRounds = 10;
    const currentPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(currentPassword, saltRounds);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const registeredUser = await newUser.save();
    res.status(200).json(registeredUser);
  } catch (error) {
    res
      .status(500)
      .json(error.message + "error in the register password hashing");
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(500).json("email not found");
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Invalid credentials!");

    const { password, ...others } = user._doc;
    res.status(200).json(others);

  } catch (error) {
    res.status(500).json(error.message + "error in the Login");
  }
});

export default router;
