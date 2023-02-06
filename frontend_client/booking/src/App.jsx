import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import BookingMainComponent from "./components/BookingMainComponent";
import BookingMainComponentProv from "./components/BookingMainComponentProv";

const user = {
    id: 1,
    firstName: "Test",
    lastName: "Test",
    token: "12345"
}
const App = () => (
  <div>
    <BookingMainComponentProv user={user} flightId={1}/>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
