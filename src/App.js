import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Events from "./components/Events/Events";
import EventDetails from "./components/EventDetails/EventDetails";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/events/:id" component={EventDetails} />
      </Switch>
    </div>
  );
}

export default App;
