const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'MongoDBReactExpressNodejs'


// Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Please enter strong password').isLength({min:5})
],async(req,res)=>{
   // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try{
    let user = await User.findOne({email: req.body.email});
    console.log(user);
    if(user){
      return res.status(400).json({error: "Sorry a user with this email already exists"})
    }
    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password,salt)
    user = await User.create({
        name: req.body.name,
        email:req.body.email,
        password: secPass,
      });
      const data={
        id:user.id
      }
      const authToken= jwt.sign(data,JWT_SECRET);
      res.json({authToken})
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("some error occured")
    }
})


// Authenticate user using: POST "/api/auth/login" : No login required
router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','password cannot be blank').exists(),
],async(req,res)=>{
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"PLEASE TRY TO LOGIN WITH CORRECT CREDENTIALS"})
      }
      const passwordCompare = await bcrypt.compare(password,user.password)
      if(!passwordCompare){
        return res.status(400).json({error:"PLEASE TRY TO LOGIN WITH CORRECT CREDENTIALS"})
      }
      const data={
        id:user.id
      }
      const authToken= jwt.sign(data,JWT_SECRET);
      res.json({authToken})
    }    catch(error){
      console.error(error.message);
      res.status(500).send("Internal server error occured")
    }
})
module.exports = router