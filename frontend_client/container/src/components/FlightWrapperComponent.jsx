import {useNavigate} from "react-router-dom";
import React from "react";
const FlightsMainComponent = React.lazy(() => import("flight_bookings/FlightsMainComponentProv"));

export default function FlightWrapperComponent() {
    const navigate = useNavigate();
    return (
        <React.Suspense fallback="Loading Component">
            <FlightsMainComponent reserveFn={(id) => {
               navigate(`/flights/${id}/reserve`)
            }
            }/>
        </React.Suspense>
    )
}