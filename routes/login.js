const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Profile = require('../models/userProfile.js');
const { validateLogin } = require('../_validate.js');


router.post('/', async (req, res) => {
  
  const { value, error } = validateLogin(req.body);
  if (error) return res.send(error.details[0].message);

  const existingProfile = await Profile.findOne({ email: value.email });
  if (!existingProfile) return res.send('Email not found !');

  const isPasswordValid = await bcrypt.compare(value.password, existingProfile.password);
  if (!isPasswordValid) return res.send('Invalid Password :(');

  const token = jwt.sign({ _id: existingProfile._id }, process.env.AUTH_SECRET_TOKEN);
  res.header('auth-token', token).send(token);
  
});


module.exports = router;