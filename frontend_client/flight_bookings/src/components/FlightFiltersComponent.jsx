import {
    AppBar,
    Box, Button,
    Card,
    Container, createTheme, Divider, FormControl, FormHelperText,
    Grid,
    InputAdornment, InputLabel, MenuItem,
    Paper, Select,
    TextField,
    ThemeProvider,
    Toolbar,
    Typography, useTheme
} from "@mui/material";

import React from "react";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {AirplaneTicket, FlightLand, FlightTakeoff, DateRange, DateRangeOutlined, Search} from "@mui/icons-material";

export default function FlightFiltersComponent() {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const theme = useTheme();

    return (
        <AppBar position={"sticky"} sx={{backgroundColor: theme.palette.primary.dark}}>
            <ThemeProvider theme={darkTheme}>
                <Container maxWidth={"xl"}>
                    <Toolbar>
                        <AirplaneTicket sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, mb: 0}}/>
                        <Typography component="h1" variant="h5">
                            Flight Search
                        </Typography>
                    </Toolbar>
                    <Divider/>
                    <Box component={"form"} noValidate sx={{ mt: 0 }}>
                        <Grid container spacing={2} columns={13}>
                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center'}}>
                                <FlightTakeoff sx={{ color: 'action.active', mr: 0, my: 0.5 }}/>
                                <FormControl sx={{ m: 1, width: "100%"}}>
                                    <InputLabel>Departure</InputLabel>
                                    <Select
                                        label="Departure"
                                        variant={"standard"}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                    <FormHelperText>Select your departure place</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center'}}>
                                <FlightLand sx={{ color: 'action.active', mr: 0, my: 0.5 }}/>
                                <FormControl sx={{ m: 1, width: "100%"}}>
                                    <InputLabel>Arrival</InputLabel>
                                    <Select
                                    label="Arrival"
                                    variant={"standard"}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                    <FormHelperText>Select your arrival place</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center'}}>
                                <DateRangeOutlined sx={{ color: 'action.active', mr: 0.5, my: 0.5 }}/>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DateTimePicker
                                        renderInput={(props) =>
                                            <TextField {...props}
                                                       variant={"standard"}
                                                       helperText={"Select minimum departure date"}
                                                       margin={"normal"}
                                                       label="Start Date"
                                                       InputProps={null}
                                                       fullWidth
                                            />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center'}}>
                                <DateRangeOutlined sx={{ color: 'action.active', mr: 0.5, my: 0.5 }}/>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DateTimePicker
                                        renderInput={(props) =>
                                            <TextField {...props}
                                                       variant={"standard"}
                                                       helperText={"Select maximum departure date"}
                                                       margin={"normal"}
                                                       label="End Date"
                                                       InputProps={null}
                                                       fullWidth
                                            />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center'}}>
                                <Button variant={"solid"}>
                                    <Search/>
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </ThemeProvider>
        </AppBar>
    )
}