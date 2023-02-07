import React from "react";
import {Box, Button, Container, Grid, List, ListItem, Radio, Typography} from "@mui/material";
import {BackpackOutlined, LuggageOutlined} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {selectPackageAction} from "../reducers/bookingsSlice";

export default function BookingFlightPackageFormComponent({packages}) {
    const {selectedPackage} = useSelector(state => state.bookingsSlice)
    const dispatch = useDispatch()

    return (
        <Box>
            <Typography variant={"subtitle1"} color={"text.secondary"} fontWeight={"bolder"}>
                Flight Package Details
            </Typography>
            <List>
                {
                    packages.map(pack =>
                        <ListItem key={pack.id} sx={{justifyContent: "space-between"}}>
                            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <Typography variant={"subtitle1"} color={"text.secondary"} sx={{paddingX: 1}} fontWeight={"bolder"}>
                                    {`$${pack.amount}`}
                                </Typography>
                                <Typography variant={"subtitle2"} color={"text.secondary"} sx={{borderLeft: '1px solid rgba(0, 0, 0, 0.26)', paddingX: 1}}>
                                    {pack.description}
                                </Typography>
                            </Box>
                            <Button variant={pack.id === selectedPackage.id ? "contained" : "outlined"} onClick={() => dispatch(selectPackageAction(pack.id))}>
                                Select
                            </Button>
                        </ListItem>
                    )
                }
            </List>
        </Box>
    )

}