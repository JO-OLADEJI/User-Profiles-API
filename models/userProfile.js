const mongoose = require('mongoose');


const schema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    min: 2,
    max: 255
  },
  lastname: {
    type: String,
    required: true,
    min: 2,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 2,
    max: 512
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 512
  },
  about: {
    type: String,
    required: true,
    min: 1,
    max: 160,
    default: '.'
  },
  date: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('profiles', schema);