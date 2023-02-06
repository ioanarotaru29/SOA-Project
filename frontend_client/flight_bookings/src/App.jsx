import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import FlightsMainComponent from "./components/FlightsMainComponent";
import FlightsMainComponentProv from "./components/FlightsMainComponentProv";

const App = () => (
  <React.Fragment>
      <FlightsMainComponentProv/>
  </React.Fragment>
);
ReactDOM.render(<App />, document.getElementById("app"));
