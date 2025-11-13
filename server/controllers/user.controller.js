import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import {register} from "./user.controller.js";

export const register = async (req, res) => {
  try {
    console.log("Register request body:", req.body); // Log incoming request data
    const { fullname, email, password, phoneNumber, role } = req.body;
    console.log("Destructured values:", { fullname, email, password, phoneNumber, role }); // Log destructured values
    if (!fullname || !email || !password || !phoneNumber || !role) {
      console.log("Missing required fields: fullname, email, password, phoneNumber, or role");
      return res.status(400).json({
        message: "Something is wrong",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    console.log("Login request body:", req.body); // Log incoming request data
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      console.log("Missing required fields: email, password, or role");
      return res.status(400).json({
        message: "Something is wrong",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    console.log("User found in DB:", user ? "Yes" : "No");
    if (!user) {
      console.log("User does not exist for email:", email);
      return res.status(400).json({
        message: "User does not exist",
        success: false,
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    console.log("Password match:", isPasswordMatched);
    if (!isPasswordMatched) {
      console.log("Invalid password for user:", email);
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }

    //check role is correct or not
    console.log("User role in DB:", user.role, "Provided role:", role);
    if (role !== user.role) {
      console.log("Role mismatch for user:", email);
      return res.status(400).json({
        message: "Account does not exist with current role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    console.log("Login successful, sending response with user data");
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        samesite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log("Error in login controller:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file; //middleware se aayega
    // if (!fullName || !email || !phoneNumber || !bio || !skills) {
    //   return res.status(400).json({
    //     message: "Somthing is wrong",
    //     success: false,
    //   });
    // }

    //CLOUDINARY AYEGA IDHAR
    let skillsArray;
     if(skills){
     skillsArray = skills.split(",");
     }

    
    const userId = req.id; //Middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    //Updating Data
    if(fullName) user.fullName = fullName
    if(email) user.email = email
    if(phoneNumber) user.phoneNumber = phoneNumber
    if(bio) user.profile.bio = bio
    if(skills) user.profile.skills = skillsArray

    

    //resume comes later here....

    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user, //nessessary data
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
