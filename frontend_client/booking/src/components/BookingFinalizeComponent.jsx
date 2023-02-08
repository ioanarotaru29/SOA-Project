import React from "react";
export default function BookingFinalizeComponent() {
    const eventSource = new EventSource('http://localhost:3000/sse');
    eventSource.onmessage = (ev) => {
        ev.data
        console.log('New message', ev.data);
    };

    return <React.Fragment></React.Fragment>
}