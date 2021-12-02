import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Route } from 'react-router-dom';
import UserContext from './context';
import { useState } from 'react';

import Navigation from './Navigation';
import Home from './Home';
import CreateAccount from './CreateAccount';
import Login from './Login';
import Deposit from './Deposit';
import Withdraw from './Withdraw';

function App() {
  const [loggedIn, setLoggedIn] = useState({
    id: null,
    name: null,
    email: null,
    balance: null,
  });
  return (
    <>
      <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
        <Navigation />
        <HashRouter>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/createaccount" component={CreateAccount} />
          <Route path="/login" component={Login} />
          <Route path="/deposit" component={Deposit} />
          <Route path="/withdraw" component={Withdraw} />
        </HashRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
