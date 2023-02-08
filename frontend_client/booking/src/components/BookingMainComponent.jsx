import {Box, Card, Container, CssBaseline, Grid} from "@mui/material";
import React, {useEffect} from "react";
import BookingFlightInfoComponent from "./BookingFlightInfoComponent";
import {useDispatch, useSelector} from "react-redux";
import {fetchFlightAction, setUserAction} from "../reducers/bookingsSlice";
import BookingFinalizeComponent from "./BookingFinalizeComponent";

export default function BookingMainComponent({crtUser, flightId, cancelFn, skipAuth}) {
    const { processingSuccess, payUrl } = useSelector(state => state.bookingsSlice)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchFlightAction(flightId));
        dispatch(setUserAction(crtUser));
    }, [dispatch])

    useEffect(() => {
        if (processingSuccess && payUrl) {
            window.location.replace(payUrl)
        }
    }, [processingSuccess])

    return (
        <Container maxWidth={"md"} sx={{marginY: 2}}>
            <CssBaseline/>
            { skipAuth ?
                <BookingFinalizeComponent cancelFn={cancelFn}/>
                :
                <BookingFlightInfoComponent cancelFn={cancelFn}/>
            }
        </Container>
    )
}