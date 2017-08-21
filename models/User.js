const mongoose  = require('mongoose');

const UsersSchema = new mongoose.Schema({
  googleID: String,
  credits: { type: Number, default: 0 }
});

mongoose.model('users', UsersSchema);