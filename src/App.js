import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import ProfileView from './ProfileView';
import ProtectedRoute from './ProtectedRoute';

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
            <ProtectedRoute path="/profile/:userid" component={Profile} />
            <ProtectedRoute path="/settings" />
            <Route path="/:username/" component={ProfileView}/>
          </Switch>
        </div>
      </Router>
    );
  }