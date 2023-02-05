import {Navigate} from "react-router-dom";
import {useContext} from "react";

export const PrivateRoute = ({component, defaultPath}) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated)
        return component;

    return <Navigate to={defaultPath}/>
}