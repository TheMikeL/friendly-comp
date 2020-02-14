const mongoose = require('mongoose');

const { Schema } = mongoose;

const entrySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  competition: {
    type: Schema.Types.ObjectId,
    ref: 'Competition',
  },
},
{ timestamps: true });

// Collection Name
module.exports = mongoose.model('Entry', entrySchema);
