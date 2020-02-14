import React from 'react';

export default React.createContext({
  auth: {loggedIn: false, token: "", userId:""},
  login: (userId, token, tokenExpiration) => {},
  logout: () => {}
});