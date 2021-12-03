const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
   name: { type: String },
   descripption: { type: String },
},{
   timestamps:true
}

);

module.exports = mongoose.model('Todo', todoSchema);