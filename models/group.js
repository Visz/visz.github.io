const mongoose = require('mongoose');
const { Schema } = mongoose;

const spotSchema = new Schema({
  userName: String,
  role: String,
});

const groupSchema = new Schema({
  name: String,
  spots: [spotSchema],
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
