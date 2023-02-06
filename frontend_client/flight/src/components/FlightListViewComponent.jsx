import {
    List,
    ListItem,
} from "@mui/material";
import React from "react";
import FlightListItemComponent from "./FlightsListItemComponent";

export default function FlightListViewComponent({items, onClickEvent}) {
    return (
        <List>
            {
                items.map(item => <ListItem key={item.id}><FlightListItemComponent item={item} onClickEvent={onClickEvent}/></ListItem>)
            }
        </List>
    )
}