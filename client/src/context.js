import { createContext } from 'react';

export default createContext({
  loggedIn: {
    id: null,
    name: null,
    email: null,
    balance: null,
  },
  setLoggedIn: (user) => {},
});
