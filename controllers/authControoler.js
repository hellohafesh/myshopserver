import { hashSync } from "bcrypt";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;
    // validation
    if (!name) {
      return res.send({ message: "Name Is Required" });
    }
    if (!email) {
      return res.send({ message: "Email Is Required" });
    }
    if (!password) {
      return res.send({ message: "Password Is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone Is Required" });
    }
    // check user
    const existingUser = await userModel.findOne({ email });
    // existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered",
      });
    }

    // Register user
    const hashedPassword = await hashPassword(password);
    // save password
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "Register Sucess",
      user,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error In Register",
      e,
    });
  }
};

// login POST

export const LogInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Email or Password Invalid",
        e,
      });
    }

    // check user
    const user = await userModel.findOne({ email });
    // existing user
    if (!user) {
      return res.status(200).send({
        success: true,
        message: "Not Registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: true,
        message: "Not Match Password",
      });
    }

    // token

    const jwtToken = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.status(200).send({
      success: true,
      message: "Login Sucess",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      jwtToken,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error In Login",
      e,
    });
  }
};

// forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emile is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }

    // check

    const user = await userModel.findOne({ email, answer });
    // validation
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Update Sucessfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
      e,
    });
  }
};

// test controller

export const testController = (req, res) => {
  res.send("Protect");
};
