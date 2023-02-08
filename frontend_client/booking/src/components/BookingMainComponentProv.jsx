import {Provider, useDispatch, useSelector} from 'react-redux';
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import BookingMainComponent from "./BookingMainComponent";
import {bookingsSlice} from "../reducers/bookingsSlice";
import React from "react";

const reducer = combineReducers({
    bookingsSlice: bookingsSlice.reducer
})

const store = configureStore({reducer});

export default function BookingMainComponentProv({user, flightId, cancelFn, skipAuth}) {
    return (
        <Provider store={store}>
            <BookingMainComponent crtUser={user} flightId={flightId} cancelFn={cancelFn} skipAuth={skipAuth}/>
        </Provider>
    )
}