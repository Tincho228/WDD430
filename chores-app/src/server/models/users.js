const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   id: { type:Number },
   name: { type: String },
   password: { type: String },
   admin: { type:Boolean, default:false }
},{
   timestamps:true
}

);

module.exports = mongoose.model('User', userSchema);