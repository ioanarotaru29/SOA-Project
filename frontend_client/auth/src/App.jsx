import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import {BrowserRouter as Router} from "react-router-dom";
import {AuthProvider} from "./providers/AuthProvider";
import AuthMainComponent from "./components/AuthMainComponent";

const App = () => (
    <AuthProvider>
        <Router>
            <AuthMainComponent defaultRoute={'/flights'}/>
        </Router>
      {/*<SignIn/>*/}
      {/*<SignUp/>*/}
    </AuthProvider>
);
ReactDOM.render(<App />, document.getElementById("app"));
