import React from "react";
import {Box, Container, CssBaseline} from "@mui/material";
import FlightFiltersComponent from "./FlightFiltersComponent";
import FlightListViewComponent from "./FlightListViewComponent";
export default function FlightsMainComponent() {
    return (
        <Box sx={{ width: '100%' }}>
            <CssBaseline/>
            <FlightFiltersComponent/>
            <FlightListViewComponent/>
        </Box>
    )
}