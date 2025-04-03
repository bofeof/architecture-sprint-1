import React from "react";
import ReactDOM from "react-dom";
import Profile from "./components/Profile"

import "./index.css";

const App = () => (
  <div className="container">
    <div>Name: profile</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
    <Profile></Profile>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
