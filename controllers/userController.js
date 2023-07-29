const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const nodemailer = require("nodemailer");
const fast2sms = require('fast-two-sms')
const randomstring = require("randomstring");

const cloudinary = require("cloudinary").v2;

const sendEmailResetMailer = async (email, token, id) => {
  try {
    const transport = await nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      requireTLS: false,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    });
    const mailOption = {
      from: config.emailUser,
      to: email,
      subject: "Reset Password",
      html: `<p> plaese reset password <a href="http://127.0.0.1:5173/reset-password/${id}/${token}">reset your password</a></p>`,
    };
    transport.sendMail(mailOption, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("mail has been send -", info.response);
      }
    });
  } catch (error) {}
};

const home = (req, res) => {
  try {
    res.send("sumit");
  } catch (error) {
    console.log(error);
  }
};

// Configuration
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.SECRET_KEY
});

const register = async (req, res) => {
  const { name, email, password, mobile } = req.body;
  const newUser = await User.findOne({ email: email });
  if (newUser) {
    res.status(201).json({ message: "Email already exists" });
  } else {
    if (name && email && password && mobile) {
      try {
        const passwordHash = await bcrypt.hash(password, 10);
        const doc = new User({
          name: name,
          email: email,
          mobile: mobile,
          password: passwordHash,
        });
        await doc.save();
        const token = jwt.sign({ doc }, config.secret_jwt, {
          expiresIn: "2h",
        });
        res.status(200).json({ message: "Register Sucess", user: doc, token });
      } catch (error) {
        res.status(201).json({ message: "failed" });
      }
    } else {
      res.status(201).json({ message: "All fields are required" });
    }
  }
};

const sendOtp = async (req, res) => {
  try {
    const { id,mobile } = req.body;
    const otp = Math.floor(Math.random() * 900000) + 100000; // Generate a 6-digit OTP
    console.log(otp);

    const userInfo = await User.findById(id);

    if (userInfo) {
      userInfo.mobileOtp = otp;
      userInfo.mobile = mobile || userInfo.mobile ;
      await userInfo.save();

      const response = await fast2sms.sendMessage({
        authorization: process.env.API_KEY,
        message: `Your OTP is ${otp}`,
        numbers: [userInfo.mobile||mobile]
      });

      res.json({ message: "OTP sent successfully", response });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating data" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, id } = req.body;
    const user = await User.findById({_id:id});
    if (user) {
      if (user.mobileOtp == otp) {
        user.mobileVerified = true;
        await user.save();
        res.json({ message: "OTP verified successfully" });
      } else {
        res.json({ message: "Invalid OTP" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP" });
  }
};



const getUserData = async (req, res) => {
  try {
    const { country, state, city, location, pincode, id } = req.body;
    const user = await User.findById(id);
    if (user) {
      user.address.country = country || user.address.country;
      user.address.state = state || user.address.state;
      user.address.city = city || user.address.city;
      user.address.location = location || user.address.location;
      user.address.pincode = pincode || user.address.pincode;

      await user.save();
      res.json({ message: "Data updated successfully" });
    } else {
      res.json({ message: "User not found" });
    }
  } catch (error) {
    res.json({ message: "Error updating data" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email: email });
    if (userData) {
      const isMatch = await bcrypt.compare(password, userData.password);
      if (userData.email === email && isMatch) {
        req.session._id = userData._id;
        req.session.email = userData.email;
        const token = await jwt.sign({ userData }, config.secret_jwt, {
          expiresIn: "2h",
        });
        res
          .status(200)
          .json({ message: "Login Success", user: userData, token });
      } else {
        res.status(201).json({ message: "Email or password is not valid" });
      }
    } else {
      res.status(201).json({ message: "User not register" });
    }
  } catch (error) {
    res.status(201).json({ message: "failed" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    userData = await User.findOne({ email: email });
    if (userData) {
      const randomString = randomstring.generate();
      const data = await User.updateOne(
        { email: email },
        { $set: { token: randomString, expiresIn: "2000" } }
      );
      sendEmailResetMailer(userData.email, randomString, userData._id);
      res.status(200).json({
        success: true,
        message: "Please check your email and Reset Password",
      });
    } else {
      res.status(200).json({ success: true, message: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password, confirm_password } = req.body;
    if (password === confirm_password) {
      const validUser = await User.findOne({ _id: id });
      if (validUser.token === token) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userVerify = await User.findOneAndUpdate(
          { _id: id },
          { $set: { password: hashedPassword } }
        );
        res
          .status(200)
          .json({ success: true, message: "Password Changed", userVerify });
      } else {
        res.status(201).json({ success: true, message: "token is not valid" });
      }
    } else {
      res.status(201).json({ success: true, message: "password is not match" });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  home,
  register,
  login,
  forgotPassword,
  resetPassword,
  getUserData,
  sendOtp,
  verifyOtp
};
