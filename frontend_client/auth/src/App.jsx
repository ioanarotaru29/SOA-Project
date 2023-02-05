import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import {Router} from "react-router-dom";
import {AuthProvider} from "./providers/AuthProvider";

const App = () => (
    <AuthProvider>
      <div className="container">
          <SignIn/>
          {/*<SignUp/>*/}
      </div>
    </AuthProvider>
);
ReactDOM.render(<App />, document.getElementById("app"));
