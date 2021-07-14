const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ApplicantSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  first_name: {
    type: String,
    required: [true, 'first_name field is required']
  },
  last_name: {
    type: String,
    required: [true, 'last_name field is required']
  },
  email: {
    type: String,
    required: [true, 'email field is required']
  },
  location: {
    type: String,
    required: [true, 'location field is required']
  },
  created_at: {
    type: Date,
    required: [true, 'created_at field is required']
  },
  pitch: {
    type: String,
    required: [true, 'location field is required']
  },
})

module.exports = mongoose.model('users', ApplicantSchema)