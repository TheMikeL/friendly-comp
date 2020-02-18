import React from 'react';

export default React.createContext({
  auth: {loggedIn: false, token: "", userId:"", tokenExpiration: 0, name: ""},
  login: (userId, token, tokenExpiration, name) => {},
  logout: () => {}
});