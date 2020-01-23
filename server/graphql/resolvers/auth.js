const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error('User already exists.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      const userSavedResult = await user.save();
      return { ...userSavedResult._doc, password: null };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const currentUser = await User.findOne({ email }); // Same as email: email
    if (!currentUser) {
      throw new Error('User does not exist!');
    }
    const isPasswordValid = await bcrypt.compare(password, currentUser.password);
    if (!isPasswordValid) {
      throw new Error('Password is incorrect!');
    }
    const jwtToken = jwt.sign(
      { userId: currentUser.id, email: currentUser.email },
      'somesupersecretkey',
      { expiresIn: '12h' },
    );
    return { userId: currentUser.id, token: jwtToken, tokenExpiration: 12 };
  },
};
