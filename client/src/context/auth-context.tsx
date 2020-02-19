import React from 'react';

interface IAuthContext {
  auth:{
    loggedIn: boolean,
    userId: string,
    token: string,
    tokenExpiration: number,
    name: string,
  },
  login: (userId:string, token:string, tokenExpiration:number, name:string) => void,
  logout: () => void,
}

export default React.createContext<IAuthContext>({
  auth: {loggedIn: false, token: "", userId:"", tokenExpiration: 0, name: ""},
  login: (userId, token, tokenExpiration, name) => {},
  logout: () => {}
});