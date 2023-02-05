import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "auth/AuthContext";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const AuthComponent = React.lazy(() => import("auth/AuthMainComponent"));

import "./index.css";
import TestComponent from "../TestComponent";

const App = () => (
    <AuthProvider>
        <Router>
            <Routes>
                <Route path={'/flights'} element={<TestComponent/>}/>
                <Route path={'/auth/*'} element={
                    <React.Suspense fallback="Loading Component">
                        <AuthComponent defaultRoute={'/flights'} />
                    </React.Suspense>}/>
                }
                {/*<React.Suspense fallback="Loading Component">*/}
                {/*    <AuthComponent defaultRoute={'/flights'} />*/}
                {/*</React.Suspense>*/}
            </Routes>
        </Router>
    </AuthProvider>
);
ReactDOM.render(<App />, document.getElementById("app"));
