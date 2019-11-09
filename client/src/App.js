import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Dashboard from './screens/Dashboard';
import "./App.css";

function App() {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route exact path='/' component={Dashboard} />
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
