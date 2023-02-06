import {Provider, useDispatch, useSelector} from 'react-redux'
import {fetchFlightsAction, flightsSlice} from "../reducers/flightsSlice";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import FlightsMainComponent from "./FlightsMainComponent";
import React from "react";

const reducer = combineReducers({
    flightsSlice: flightsSlice.reducer
})

const store = configureStore({reducer});

export default function FlightsMainComponentProv() {
    return (
        <Provider store={store}>
            <FlightsMainComponent/>
        </Provider>
    )
}