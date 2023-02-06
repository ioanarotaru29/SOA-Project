import React, {useEffect} from "react";
import {Box, Container, CssBaseline} from "@mui/material";
import FlightFiltersComponent from "./FlightFiltersComponent";
import FlightListViewComponent from "./FlightListViewComponent";
import {useDispatch, useSelector} from "react-redux";
import {fetchFiltersAction, fetchFlightsAction, filterFlightsAction} from "../reducers/flightsSlice";
export default function FlightsMainComponent() {
    const {flights, filters} = useSelector((state) => state.flightsSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFlightsAction())
        dispatch(fetchFiltersAction())
    }, [dispatch])

    const filtersSubmit = (source, destination, startDate, endDate) => {
        dispatch(filterFlightsAction(source, destination, startDate, endDate))
    }

    return (
        <Box sx={{ width: '100%' }}>
            <CssBaseline/>
            <FlightFiltersComponent sources={filters.sources} destinations={filters.destinations} onClickEvent={filtersSubmit}/>
            <FlightListViewComponent items={flights}/>
        </Box>
    )
}