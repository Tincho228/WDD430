const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   name: { type: String },
   password: { type: String },
});

module.exports = mongoose.model('User', UserSchema);