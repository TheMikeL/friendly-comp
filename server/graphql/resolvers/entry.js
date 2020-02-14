const Entry = require('../../models/entry');
const User = require('../../models/user');

const { dateToString } = require('../../helpers/date');
const { transformEntry } = require('./merge');


module.exports = {
  Entries: async () => {
    try {
      const entries = await Entry.find();
      return entries.map((entry) => transformEntry(entry));
    } catch (err) {
      throw err;
    }
  },
  createEntry: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    const entry = new Entry({
      title: args.entryInput.title,
      description: args.entryInput.description,
      date: dateToString(args.entryInput.date),
      creator: req.userId,
    });
    try {
      const entryResponse = await entry.save();
      const createdEntry = transformEntry(entryResponse);
      const creator = await User.findById(req.userId);
      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdEntries.push(createdEntry);
      await creator.save();
      return createdEntry;
    } catch (err) {
      throw err;
    }
  },
  removeEntry: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    try {
      const entry = await Entry.findById(args.entryId);
      await Entry.deleteOne({ _id: args.entryId });
      return entry;
    } catch (err) {
      throw err;
    }
  },
};
