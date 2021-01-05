const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
  title: { type: String },
  description: { type: String },
  image: { type: String },
  body: { type: String },
  content: { type: String },
}, {
  timestamps: { 
    createdAt: 'createTime', 
    updatedAt: 'updateTime' 
  }
})

module.exports = mongoose.model('Article', schema)