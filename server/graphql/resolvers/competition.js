const Competition = require('../../models/competition');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');


const { transformCompetition, transformEvent } = require('./merge');

module.exports = {
  competitions: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    
    try {
      const competitions = await Competition.find({users: req.userId});
      return competitions;
    } catch (err) {
      throw err;
    }
  },
  createCompetition: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    const currentUser = await User.findById(req.userId);
    if (!currentUser) {
      throw new Error('User not found.');
    }
    console.log("CurrentUser", currentUser)
    const hashedPassword = await bcrypt.hash(args.competitionInput.password, 10);
    const competition = new Competition({
      title: args.competitionInput.title,
      password: hashedPassword,
      description: args.competitionInput.description,
      creator: currentUser,
    });
    try {
      const existingCompetition = await Competition.findOne({ title: args.competitionInput.title });
      if (existingCompetition) {
        throw new Error('Competition already exists.');
      }
      competition.users.push(req.userId);
      const competitionResult = await competition.save();
      
      console.log("Competition Created!");
      currentUser.competitions.push(competitionResult);
      await currentUser.save();
      return competitionResult;
    } catch (err) {
      throw err;
    }
  },
  
  joinCompetition: async (args, req) => {
    try{
      const foundCompetition = await Competition.findOne({ title: args.title });
      if (!foundCompetition){
        throw new Error('Competition does not exist.');
      }
      const isPasswordValid = await bcrypt.compare(args.password, foundCompetition.password);
      if (!isPasswordValid) {
        throw new Error('Password is incorrect!');
      }
      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error('User not found.');
      }
      if (!user.competitions.filter((comp) => {return comp === foundCompetition._id})){
        user.competitions.push(foundCompetition);
        await user.save();
      }
      foundCompetition.users.push(user);
      await foundCompetition.save();
      console.log(`${foundCompetition.title} competition joined by ${user.firstName}!`);
      console.log("JoinedUser",user);
      return foundCompetition;
    }catch(err){
      throw new Error("Error", err);
    }
  }

  // cancelCompetition: async (args, req) => {
  //   if (!req.isAuth) {
  //     throw new Error('Unauthenticated');
  //   }
  //   try {
  //     const competition = await Competition.findById(args.competitionId).populate('entry');
  //     const entry = transformEvent(competition.entry);
  //     await Competition.deleteOne({ _id: args.competitionId });
  //     return entry;
  //   } catch (err) {
  //     throw err;
  //   }
  // },
};
