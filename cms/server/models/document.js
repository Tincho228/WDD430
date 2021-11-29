const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
   id: { type: String },
   name: { type: String },
   url: { type: String },
   children: { type:Array },
   descripttion:{ type:String }
});

module.exports = mongoose.model('Document', documentSchema);