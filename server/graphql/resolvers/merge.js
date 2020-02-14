const DataLoader = require('dataloader');
const Entry = require('../../models/entry');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const entryLoader = new DataLoader((entryIds) => {
  return getEntries(entryIds);
});

const userLoader = new DataLoader((userIds) => {
  return User.find({_id: {$in: userIds}});
})

const getEntries = async (entryIds) => {
  try {
    const entries = await Entry.find({ _id: { $in: entryIds } });
    // entries.sort((a,b) => {
    //   return (
    //     entryIds.indexOf(a._id.toString()) - entryIds.indexOf(b._id.toString())
    //   );
    // });
    return entries.map((entry) => transformEntry(entry));
  } catch (err) {
    throw err;
  }
};

const singleEntry = async (entryId) => {
  try {
    const entry = await entryLoader.load(entryId.toString());
    return entry;
  } catch (err) {
    throw err;
  }
};

const getUser = async (userId) => {
  try {
    const currentUser = await userLoader.load(userId.toString());
    return ({
      ...currentUser._doc,
      createdEntries: () => entryLoader.loadMany(currentUser._doc.createdEntries),
    });
  } catch (err) {
    throw err;
  }
};

const transformEntry = (entry) => ({
  ...entry._doc,
  _id: entry.id,
  date: dateToString(entry._doc.date),
  creator: getUser(entry.creator),
});

const transformCompetition = (competition) => ({
  ...competition._doc,
  _id: competition.id,
  user: getUser(competition._doc.user),
  entry: singleEntry(competition._doc.entry),
});

// exports.getUser = getUser;
// exports.getentries = getentries;
// exports.singleEntry = singleEntry;
exports.transformEntry = transformEntry;
exports.transformCompetition = transformCompetition;
