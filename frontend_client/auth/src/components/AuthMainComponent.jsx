import {Navigate, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import React, {useContext} from "react";
import {AuthContext} from "../providers/AuthProvider";

export default function AuthMainComponent({defaultRoute}) {
    return (
        <Routes>
            <Route index element={<Navigate to="sign_in" />} />
            <Route path={'sign_in'} element={<SignIn defaultRoute={defaultRoute}/>}/>
            <Route path={'sign_up'} element={<SignUp defaultRoute={defaultRoute}/>}/>
        </Routes>
    )
}