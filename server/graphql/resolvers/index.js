const authResolver = require('./auth');
const competitionResolver = require('./competition');
const entryResolver = require('./entry');

const rootResolver = {
  ...authResolver,
  ...entryResolver,
  ...competitionResolver,
};

module.exports = rootResolver;
