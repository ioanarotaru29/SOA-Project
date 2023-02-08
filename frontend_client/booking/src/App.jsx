import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import BookingMainComponent from "./components/BookingMainComponent";
import BookingMainComponentProv from "./components/BookingMainComponentProv";
import BookingFinalizeComponent from "./components/BookingFinalizeComponent";

const user = {
    id: 1,
    firstName: "Test",
    lastName: "Test",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyMSwicGFzc3dvcmQiOiIkMmIkMTAkeExqMGcyOEtnMWNWckZibWY4b01lZS5Db0V0WUh2UGEvUENFU3VEVWNKSUIvSGdmTlZNRWEiLCJsYXN0TmFtZSI6IlBvcCIsImZpcnN0TmFtZSI6IkFuZHJlaSIsImVtYWlsIjoicG9wLmFuZHJlaUBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTA0VDExOjI4OjI2LjQzN1oifSwic3ViIjoyMSwiaWF0IjoxNjc1NzAyNzYwLCJleHAiOjE2NzU3MDMwNjB9.qgsJbOiwQg2dsv0wGopgQzmcVJPYV3Vkz2mXoBQNKyk"
}
const App = () => (
  <div>
      {/*<BookingFinalizeComponent/>*/}
    <BookingMainComponentProv user={user} flightId={1} cancelFn={()=>console.log("CANCEL")} skipAuth={true}/>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
