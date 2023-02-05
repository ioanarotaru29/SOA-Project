import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import FlightsMainComponent from "./components/FlightsMainComponent";

const App = () => (
  <React.Fragment>
      <FlightsMainComponent/>
  </React.Fragment>
);
ReactDOM.render(<App />, document.getElementById("app"));
