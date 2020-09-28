import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Home from './Home';
import Signup from './Signup';
import Login from './Login';

  export default function App() {
    return (
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/signup/:username" component={Signup}/>
            <Route exact path="/signup/" component={Signup}/>
            <Route exact path="/login/" component={Login}/>
          </Switch>
        </div>
      </Router>
    );
  }