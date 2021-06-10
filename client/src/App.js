import React from 'react';
// import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Patient from './components/Dashboard/Patient';


const App = () => (
  <BrowserRouter>
    {/* <Container maxWidth="lg"> */}
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/patient" exact component={Patient} />
      </Switch>
    {/* </Container> */}
  </BrowserRouter>
);

export default App;
