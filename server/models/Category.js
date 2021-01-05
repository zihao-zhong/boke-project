const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String }
}, {
  // 增加时间戳
  timestamps: { 
    createdAt: 'createTime', 
    updatedAt: 'updateTime' 
  }
})


module.exports = mongoose.model('Category', schema)