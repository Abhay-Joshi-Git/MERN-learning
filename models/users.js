const mongoose  = require('mongoose');

const UsersSchema = new mongoose.Schema({
  googleID: String
});

mongoose.model('users', UsersSchema);