import React from "react";
import {Box, Grid, TextField, Typography} from "@mui/material";

export default function BookingFlightUserFormComponent() {
    return (
        <Box>
            <Typography variant={"subtitle1"} color={"text.secondary"} fontWeight={"bolder"}>
                Contact Details
            </Typography>
            <Box component={"form"} noValidate>
                <Grid container columns={4} spacing={2}>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            variant={"standard"}
                            required
                            label="First Name"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            variant={"standard"}
                            required
                            label="Last Name"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            variant={"standard"}
                            required
                            label="ID Number"
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            fullWidth
                            variant={"standard"}
                            required
                            label="Email"
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            fullWidth
                            variant={"standard"}
                            label="Phone Number"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            variant={"standard"}
                            required
                            label="Address"
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            fullWidth
                            variant={"standard"}
                            required
                            label="Country"
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}