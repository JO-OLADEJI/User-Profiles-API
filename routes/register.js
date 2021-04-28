const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Profile = require('../models/userProfile.js');
const { validateRegister } = require('../_validate.js');


router.post('/', async (req, res) => {
  
  const { value, error } = validateRegister(req.body);
  if (error) return res.send(error.details[0].message);

  const duplicateEmail = await Profile.findOne({ email: value.email });
  if (duplicateEmail) return res.send('A profile with this email already exists !');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(value.password, salt);

  
  const { firstname, lastname, email, password, about } = value;
  const newProfile = new Profile({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: hashedPassword,
    about: about
  });
  const saveProfile = await newProfile.save();

  res.send(`A profile for ${firstname} ${lastname} has been created successfully !`);
});


module.exports = router;