import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Events from "./components/Events/Events";
import EventDetails from "./components/EventDetails/EventDetails";
import UserForm from "./components/SignupForm/SignupForm";
import LoginForm from "./components/LoginForm/LoginForm";
import Profile from "./components/Profile/Profile";
import { NotAuthenticatedRoute } from "./components/AuthenticatedRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/events/:id" component={EventDetails} />
        <NotAuthenticatedRoute exact path="/signup" component={UserForm} />
        <NotAuthenticatedRoute exact path="/login" component={LoginForm} />
        <Route exact path="/profile/:id" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
