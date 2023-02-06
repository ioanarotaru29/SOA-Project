import React from "react";
import {Box, Button, Container, Grid, List, ListItem, Radio, Typography} from "@mui/material";
import {BackpackOutlined, LuggageOutlined} from "@mui/icons-material";
import {useSelector} from "react-redux";

export default function BookingFlightPackageFormComponent({packages}) {
    const {selectedPackageId} = useSelector(state => state.bookingsSlice)
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
                            <Button variant={pack.id === selectedPackageId ? "contained" : "outlined"}>
                                Select
                            </Button>
                        </ListItem>
                    )
                }
            </List>
        </Box>
    )

}