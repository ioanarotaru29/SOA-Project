import {useContext} from "react";
import { AuthContext } from "auth/AuthContext";
import React from "react";
export default function TestComponent() {
    const {firstName, lastName} = useContext(AuthContext);

    return (
        <div>
            {`${firstName} ${lastName}`}
        </div>
    )
}