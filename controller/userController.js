const userModel = require("../models/userModel.js");

const  JWT = require('jsonwebtoken');
const { hashPassword, comparePassword }  = require('../helper/authHelper.js');



exports.registerController = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).send({success: false ,  message: 'Please Fill all the Details' });
      }
     
     // status 409 means conflicting 
  
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(409).send({
          success: false,
          message: 'Already Register Please Login',
        })
      }
  
      const hashedPassword = await hashPassword(password);
      const user = await new userModel({
        name,
        email,
        
        password: hashedPassword,
        
  
      }).save();
      res.status(201).send({
        success: true,
        message: "User Register Successfully",
        user,
      });
  
    } catch (error) {
      
      res.status(500).send({
        success: false,
        message: 'Error in Registration',
        error
      })
    }
  }

  exports.loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
  
  
      if (!email || !password) {
        return res.status(400).send({
          success: false,
          message: "Please fill all the details",
        });
      }
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Email is not registerd",
        });
      }
  
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(401).send({
          success: false,
          message: "Invalid Password",
        });
      }
  
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
  
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
  
          name: user.name,
          email: user.email,
          phone: user.phone,
          
  
        },
        token,
      });
  
  
  
  
  
    }
    catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
  
    }
  }
  

  
  