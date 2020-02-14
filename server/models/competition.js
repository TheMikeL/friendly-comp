const mongoose = require('mongoose');

const { Schema } = mongoose;

const competitionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  entries: [{
    type: Schema.Types.ObjectId,
    ref: 'Entry',
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  score: {
    type: String
  },
  description: {
    type: String,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
},
{ timestamps: true });

// Collection Name
module.exports = mongoose.model('Competition', competitionSchema);
