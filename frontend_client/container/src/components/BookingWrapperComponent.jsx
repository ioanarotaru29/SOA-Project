import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import React, {useContext} from "react";
import { AuthContext } from "auth/AuthContext";
import { PrivateRoute } from "auth/PrivateRoute";

const BookingMainComponent = React.lazy(() => import("booking/BookingMainComponentProv"));

export default function BookingWrapperComponent() {
    const navigate = useNavigate();
    const {id, token, firstName, lastName} = useContext(AuthContext);
    const params = useParams()
    const [searchParams] = useSearchParams()

    console.log(id, token, firstName, lastName)
    return (
        searchParams.get('skipAuth') ?
            <React.Suspense fallback="Loading Component">
                <BookingMainComponent cancelFn={() => {
                    navigate(`/flights/`)
                }}
                                      flightId={params.id}
                                      packageId={searchParams.get('packageId')}
                                      skipAuth={true}
                />
            </React.Suspense>
            :
        <PrivateRoute redirectPath={'/auth/'}>
            <React.Suspense fallback="Loading Component">
                <BookingMainComponent cancelFn={() => {
                    navigate(`/flights/`)
                }}
                                      user={{id, token, firstName, lastName}}
                                      flightId={params.id}
                />
            </React.Suspense>
        </PrivateRoute>

    )
}