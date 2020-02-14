const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    trim: true,
    lowercase: true,
  },
  createdEntries: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Entry',
    },
  ],
  competitions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Competition',
    },
  ],
});

// Collection Name
module.exports = mongoose.model('User', userSchema);
