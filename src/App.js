import React from "react";
import World from "./components/World";
import Header from "./components/header";
import { Route, Switch, Redirect } from "react-router-dom";
import Country from "./components/Country";

function App() {
  return (
    <div className="App">
      <Header />
      <Redirect from="/" to="/covid_19_tracker/world" />
      <Switch>
        <Route path="/covid_19_tracker/world" component={World} />
        <Route path="/covid_19_tracker/country" component={Country} />
      </Switch>
    </div>
  );
}

export default App;
