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

import React, {useState} from "react";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {
    AirplaneTicket,
    FlightLand,
    FlightTakeoff,
    DateRange,
    DateRangeOutlined,
    Search,
    Clear
} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";

export default function FlightFiltersComponent({sources, destinations, onClickEvent}) {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

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
                        <Grid container spacing={2} columns={14}>
                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center'}}>
                                <FlightTakeoff sx={{ color: 'action.active', mr: 0, my: 0.5 }}/>
                                <FormControl sx={{ m: 1, width: "100%"}}>
                                    <InputLabel>Departure</InputLabel>
                                    <Select
                                        label="Departure"
                                        variant={"standard"}
                                        value={source}
                                        onChange={event => setSource(event.target.value)}
                                    >
                                        {
                                            sources.map((source, i) => <MenuItem key={i} value={source}>{source}</MenuItem> )
                                        }
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
                                    value={destination}
                                    onChange={event => setDestination(event.target.value)}
                                    >
                                        {
                                            destinations.map((destination, i) => <MenuItem key={i} value={destination}>{destination}</MenuItem> )
                                        }
                                    </Select>
                                    <FormHelperText>Select your arrival place</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center'}}>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DateTimePicker
                                        renderInput={(props) =>
                                            <TextField {...props}
                                                       variant={"standard"}
                                                       helperText={"Select minimum departure date"}
                                                       margin={"normal"}
                                                       label="Start Date"
                                                       fullWidth
                                            />}
                                        inputFormat={"DD MMM, YY HH:mm"}
                                        value={startDate}
                                        onChange={newValue => setStartDate(newValue)}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center'}}>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DateTimePicker
                                        renderInput={(props) =>
                                            <TextField {...props}
                                                       variant={"standard"}
                                                       helperText={"Select maximum departure date"}
                                                       margin={"normal"}
                                                       label="End Date"
                                                       fullWidth
                                            />}
                                        inputFormat={"DD MMM, YY HH:mm"}
                                        value={endDate}
                                        onChange={newValue => setEndDate(newValue)}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center'}}>
                                <Button variant={"solid"} onClick={() => onClickEvent(source, destination, startDate, endDate)}>
                                    <Search/>
                                </Button>
                                <Button variant={"solid"} onClick={() => {
                                    setSource('');
                                    setDestination('');
                                    setStartDate(null);
                                    setEndDate(null);
                                    onClickEvent('', '', null, null);
                                }
                                }>
                                    <Clear/>
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </ThemeProvider>
        </AppBar>
    )
}