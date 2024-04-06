const mongoose = require('mongoose')

const Schema = mongoose.Schema

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = mongoose.model('Article', articleSchema)