import {useNavigate, useParams} from "react-router-dom";
import React, {useContext} from "react";
import { AuthContext } from "auth/AuthContext";

const BookingMainComponent = React.lazy(() => import("booking/BookingMainComponentProv"));

export default function BookingWrapperComponent() {
    const navigate = useNavigate();
    const {id, token, firstName, lastName} = useContext(AuthContext);
    const params = useParams()

    console.log(id, token, firstName, lastName)
    return (
        <React.Suspense fallback="Loading Component">
            <BookingMainComponent cancelFn={() => {
                navigate(`/flights/`)
            }}
                                  user={{id, token, firstName, lastName}}
                                  flightId={params.id}
            />
        </React.Suspense>
    )
}