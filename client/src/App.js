import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Layout from './components/Layout';
import Dashboard from './screens/Dashboard';
import Activity from './screens/Activity';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/activity" component={Activity} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
