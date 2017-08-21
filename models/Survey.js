const mongoose = require('mongoose');
const { Schema } = mongoose;
const { recipient } = require('./Recipient');

const Survey = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [recipient],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  createdDate: Date,
  lastRespondedDate: Date
});

mongoose.model('surveys', Survey);