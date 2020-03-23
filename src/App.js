import React from "react";
import World from "./components/World";
import Header from "./components/header";
import { Route, Switch, Redirect } from "react-router-dom";
import Country from "./components/Country";

function App() {
  return (
    <div className="App">
      <Header />
      <Redirect from="/" to="/world" />
      <Switch>
        <Route path="/world" component={World} />
        <Route path="/country" component={Country} />
      </Switch>
    </div>
  );
}

export default App;
