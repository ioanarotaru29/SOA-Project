import {Navigate, Outlet} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../providers/AuthProvider";
import React from "react";

export const PrivateRoute = ({children, redirectPath}) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated)
        return <Navigate to={redirectPath}/>

    return children;
}