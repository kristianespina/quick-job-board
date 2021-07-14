const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  id: Schema.ObjectId,
  company: {
    type: String,
    required: [true, 'company field is required']
  },
  position: {
    type: String,
    required: [true, 'position field is required']
  },
  created_at: {
    type: Date,
    required: [true, 'created_at field is required']
  },
  location: {
    type: String,
    required: [true, 'location field is required']
  },
  description: {
    type: String,
    required: [true, 'description field is required']
  },
  applicants: {
    type: [Number],
  }
})
JobSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('jobs', JobSchema)