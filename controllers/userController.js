const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require('../config/config')

const home = (req, res) => {
  try {
    res.send("sumit");
    console.log(req.session);
  } catch (error) { 
    console.log(error);
  }
};

const register = async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  const newUser = await User.findOne({ email: email });
  if (newUser) {
    res.status(201).json({ message: "Email already exists" });
  } else {
    if (name && email && password && cpassword) {
      if (password === cpassword) {
        try {
          const passwordHash = await bcrypt.hash(password,10);
          const doc = new User({
            name: name,
            email: email,
            password: passwordHash,
          });
          await doc.save();
          const token = jwt.sign({doc},config.secret_jwt,{expiresIn:"2h"});
          res.status(200).json({ message: "Register Sucess",user:doc,token});
        } catch (error) {
          res.status(201).json({ message: "failed" });
        }
      } else {
        res.status(201).json({ message: "Password not match"  });
      }
    } else {
      res.status(201).json({ message: "All fields are required" });
    }
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
        console.log(req.session._id);
        req.session.email = userData.email;
        const token = await jwt.sign({userData},config.secret_jwt,{expiresIn:"2h"});
        res.status(200).json({ message: "Login Success",user:userData,token });
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
module.exports = { home, register, login };
