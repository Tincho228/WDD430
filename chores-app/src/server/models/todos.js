const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
   id: {type:Number},
   name: { type: String },
   description: { type: String },
   executer_id: { type:Number, default:null }
},{
   timestamps:true
}

);

module.exports = mongoose.model('Todo', todoSchema);