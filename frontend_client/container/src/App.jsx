import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "auth/AuthContext";
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from "react-router-dom";

import "./index.css";
import { PrivateRoute } from "auth/PrivateRoute";
import TestComponent from "../TestComponent";
import FlightWrapperComponent from "./components/FlightWrapperComponent";
import AuthWrapperComponent from "./components/AuthWrapperComponent";

const App = () => (
    <AuthProvider>
        <Router>
            <Routes>
                <Route path={'/auth/*'} element={<AuthWrapperComponent/>}/>

                <Route path={'/'} element={<Navigate to={'flights'}/>}/>
                <Route path={'/flights'} element={<FlightWrapperComponent/>}/>
                <Route path={'/flights/:id/reserve'} element={<TestComponent/>}/>

                {/*<Route path={'/flights'} element={*/}
                {/*    <PrivateRoute redirectPath={'/auth'}>*/}
                {/*        <React.Suspense fallback="Loading Component">*/}
                {/*            <FlightsMainComponent />*/}
                {/*        </React.Suspense>*/}
                {/*    </PrivateRoute>*/}
                {/*}/>*/}
            </Routes>
        </Router>
    </AuthProvider>
);
ReactDOM.render(<App />, document.getElementById("app"));
