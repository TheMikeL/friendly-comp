const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Competition {
    _id: ID!
    title: String!
    password: String
    entries: [Entry!]
    users: [User!]
    score: String
    description: String
    creator: User!
  }
  type Entry {
    _id: ID!
    title: String!
    description: String!
    date: String!
    creator: User!
    competition: Competition!
  }
  type User {
    _id: ID!
    email: String!
    password: String
    firstName: String
    lastName: String
    createdEntries: [Entry!]
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
    name: String!
  }

  input EntryInput {
    title: String!
    description: String!
    date: String!
  }

  input UserInput {
    firstName: String
    lastName: String
    email: String!
    password: String!
  }
  input CompetitionInput {
    title: String!
    password: String!
    description: String
  }
  type RootQuery {
    entries: [Entry!]!
    login(email: String!, password: String!): AuthData!
    competitions: [Competition!]!
    joinCompetition(title: String!, password: String!): Competition!
  }
  type RootMutation {
    createEntry(entryInput: EntryInput): Entry
    removeEntry(entryId: ID!): Entry
    editEntry(entryInput: EntryInput): Entry 
    createUser(userInput: UserInput): User
    createCompetition(competitionInput: CompetitionInput): Competition!
  }
  schema {
    query: RootQuery 
    mutation: RootMutation
  }
`);

//Editentry, createCompetition, joinCompetition