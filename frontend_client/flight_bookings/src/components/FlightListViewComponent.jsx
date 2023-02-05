import {
    List,
    ListItem,
} from "@mui/material";
import React from "react";
import FlightListItemComponent from "./FlightsListItemComponent";

export default function FlightListViewComponent() {
    return (
        <List>
            <ListItem>
                <FlightListItemComponent/>
            </ListItem>
            <ListItem>
                <FlightListItemComponent/>
            </ListItem>

            <ListItem>
                <FlightListItemComponent/>
            </ListItem>

            <ListItem>
                <FlightListItemComponent/>
            </ListItem>

            <ListItem>
                <FlightListItemComponent/>
            </ListItem>
        </List>
    )
}