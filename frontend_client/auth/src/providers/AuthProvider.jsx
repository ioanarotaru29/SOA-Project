import {useCallback, useEffect, useState} from "react";
import {signinApi, signupApi} from "./authApi";
import React from "react";

const initialState = {
    isAuthenticated: false,
    isAuthenticating: false,
    pendingAuthentication: false,
    comesFromRegister: false,
    token: '',
    id: -1,
    firstName: '',
    lastName: ''
};
export const AuthContext = React.createContext(initialState);

export const AuthProvider = ({children}) => {
    const [state, setState] = useState(initialState);
    const { isAuthenticated, isAuthenticating, pendingAuthentication, token, id, firstName, lastName } = state;

    const login = useCallback(loginCallback, []);
    const register = useCallback(registerCallback, []);
    useEffect(authenticationEffect, [pendingAuthentication]);
    const value = { isAuthenticated, login, register, isAuthenticating, token, id, firstName, lastName };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

    function loginCallback(email, password) {
        setState({
            ...state,
            pendingAuthentication: true,
            comesFromRegister: false,
            email,
            password
        });
    }

    function registerCallback(email, password, firstName, lastName) {
        setState({
            ...state,
            pendingAuthentication: true,
            comesFromRegister: true,
            email,
            password,
            firstName,
            lastName
        });
    }

    function authenticationEffect() {
        let canceled = false;
        authenticate();
        return () => {
            canceled = true;
        }

        async function authenticate() {
            if (!pendingAuthentication) {
                return;
            }
            try {
                setState({
                    ...state,
                    isAuthenticating: true,
                });
                const { email, password, comesFromRegister } = state;
                const firstNameN = state.firstName;
                const lastNameN = state.lastName;
                const { id, firstName, lastName, accessToken } = comesFromRegister ?
                    await signupApi(email, password, firstNameN, lastNameN) :
                    await signinApi(email, password);
                if (canceled) {
                    return;
                }

                setState({
                    ...state,
                    token: accessToken,
                    id: id,
                    firstName: firstName,
                    lastName: lastName,
                    pendingAuthentication: false,
                    isAuthenticated: true,
                    isAuthenticating: false,
                    comesFromRegister: false
                });
            } catch (error) {
                if (canceled) {
                    return;
                }

                setState({
                    ...state,
                    pendingAuthentication: false,
                    isAuthenticating: false,
                    comesFromRegister: false
                });
            }
        }
    }
}
