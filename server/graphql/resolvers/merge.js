const DataLoader = require('dataloader');
const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const eventLoader = new DataLoader((eventIds) => {
  return getEvents(eventIds);
});

const userLoader = new DataLoader((userIds) => {
  return User.find({_id: {$in: userIds}});
})

const getEvents = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    // events.sort((a,b) => {
    //   return (
    //     eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
    //   );
    // });
    return events.map((event) => transformEvent(event));
  } catch (err) {
    throw err;
  }
};

const singleEvent = async (eventId) => {
  try {
    const event = await eventLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
};

const getUser = async (userId) => {
  try {
    const currentUser = await userLoader.load(userId.toString());
    return ({
      ...currentUser._doc,
      createdEvents: () => eventLoader.loadMany(currentUser._doc.createdEvents),
    });
  } catch (err) {
    throw err;
  }
};

const transformEvent = (event) => ({
  ...event._doc,
  _id: event.id,
  date: dateToString(event._doc.date),
  creator: getUser(event.creator),
});

const transformBooking = (booking) => ({
  ...booking._doc,
  _id: booking.id,
  user: getUser(booking._doc.user),
  event: singleEvent(booking._doc.event),
  createdAt: dateToString(booking._doc.createdAt),
  updatedAt: dateToString(booking._doc.updatedAt),
});

// exports.getUser = getUser;
// exports.getEvents = getEvents;
// exports.singleEvent = singleEvent;
exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
