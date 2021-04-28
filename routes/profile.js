const express = require('express');
const router = express.Router();
const auth = require('../_auth.js');
const Profile = require('../models/userProfile.js');
const { validateProfileUpdate } = require('../_validate.js');


router.get('/', auth, async (req, res) => {

  const profileId = req.user._id;
  try {
    const profileData = await Profile.findById(profileId);
    const response = `Welcome back ${profileData.firstname} !
    email: ${profileData.email}
    about: ${profileData.about}`;
    res.send(response);
  }
  catch (error) {
    res.send('Access Denied !');
  }

});


router.put('/edit', auth, async (req, res) => {
  
  const profileId = req.user._id;
  const { value, error } = validateProfileUpdate(req.body);
  if (error) return res.send(error.details[0].message);

  const { firstname, lastname, about } = value;
  try {
    const updateProfile = await Profile.updateOne(
      { _id: profileId },
      { $set: {
        firstname: firstname,
        lastname: lastname,
        about: about }
      }
    );
    res.send('Profile Updated !');
  }
  catch (error) {
    res.send('An error occured :(');
  }

});


module.exports = router;