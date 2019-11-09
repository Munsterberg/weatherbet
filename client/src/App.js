import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Dashboard from './screens/Dashboard';
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
