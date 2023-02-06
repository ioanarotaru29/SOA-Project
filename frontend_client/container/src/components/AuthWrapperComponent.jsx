import React from "react";
const AuthComponent = React.lazy(() => import("auth/AuthMainComponent"));


export default function AuthWrapperComponent() {
    return (
        <React.Suspense fallback="Loading Component">
            <AuthComponent defaultRoute={'/flights'} />
        </React.Suspense>
    )
}