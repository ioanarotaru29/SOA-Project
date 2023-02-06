import {
    AppBar,
    Box, Button,
    Card, CardActions,
    CardContent,
    Container,
    createTheme, Divider,
    Grid, styled,
    ThemeProvider,
    Typography,
    useTheme
} from "@mui/material";
import React from "react";
import {FlightLand, FlightTakeoff} from "@mui/icons-material";
import BookingFlightPackageFormComponent from "./BookingFlightPackageFormComponent";
import BookingFlightUserFormComponent from "./BookingFlightUserFormComponent";
import {useSelector} from "react-redux";


const ArrowDivider = styled("div")`
  ${({ color }) => color && `color: ${color};`}
      position: relative;
      margin: 0 10px;
      height: 50%;
  
    &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        right: 0;
        width: 10px;
        height: 10px;
        border-top: 1px solid rgba(0, 0, 0, 0.26);
        border-right: 1px solid rgba(0, 0, 0, 0.26);
        transform: rotate(45deg);
    }
    &::before {
      content: '';
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      height: 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.26);
    }
  `;

export default function BookingFlightInfoComponent() {
    const {flight, totalAmount} = useSelector(state => state.bookingsSlice)

    const startDate = new Date(flight.departure);
    const endDate = new Date(flight.departureEnd);

    const computeDateDiff = (startDate, endDate) => {
        const seconds = Math.floor((endDate - (startDate)) / 1000);
        let minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        minutes = minutes - (hours * 60);
        return {hours, minutes};
    }

    return (
        <Card elevation={2}>
            <CardContent>
                <Grid container spacing={2} columns={3}>
                    <Grid item xs={1} sx={{display: 'flex', alignItems: 'center'}}>
                        <FlightTakeoff color={"disabled"} sx={{mx: 2}}/>
                        <Box sx={{display: 'flex', alignItems: 'baseline'}}>
                            <Box sx={{display: 'flex', alignItems: 'center', mt: 2, flexDirection: "column"}}>
                                <Typography variant="body1" color="text.secondary" fontWeight={"bold"} textAlign={"center"}
                                            sx={{mx: 1}}>
                                    {startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </Typography>
                                <Typography variant={"caption"} color={"text.secondary"} fontWeight={"lighter"}>
                                    {startDate.toLocaleDateString([], {month: 'short', day: 'numeric' })}
                                </Typography>
                            </Box>
                            <Typography variant="body" color="text.secondary">{flight.source}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <ArrowDivider/>
                        <Box sx={{display: "flex", justifyContent: "center"}}>
                            <Typography display={"block"} variant="caption" color="text.secondary" fontWeight={"bold"} textAlign={"center"}
                                        sx={{mx: 1}}>
                                {`${computeDateDiff(startDate, endDate).hours}h ${computeDateDiff(startDate, endDate).minutes}m`}
                            </Typography>
                            <Typography display={"block"} variant="caption" color="text.secondary" fontWeight={"lighter"} textAlign={"center"}
                                        sx={{mx: 1}}>
                                Direct flight
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={1} sx={{display: 'flex', alignItems: 'center'}}>
                        <FlightLand color={"disabled"} sx={{mx: 2}}/>
                        <Box sx={{display: 'flex', alignItems: 'baseline'}}>
                            <Box sx={{display: 'flex', alignItems: 'center', mt: 2, flexDirection: "column"}}>
                                <Typography variant="body1" color="text.secondary" fontWeight={"bold"} textAlign={"center"}
                                            sx={{mx: 1}}>
                                    {endDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </Typography>
                                <Typography variant={"caption"} color={"text.secondary"} fontWeight={"lighter"}>
                                    {endDate.toLocaleDateString([], {month: 'short', day: 'numeric' })}
                                </Typography>
                            </Box>
                            <Typography variant="body" color="text.secondary">{flight.destination}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
            <Divider variant="middle"/>
            <CardContent>
                <BookingFlightPackageFormComponent packages={flight.packages || []}/>
            </CardContent>
            <Divider variant={"middle"}/>
            <CardContent>
                <BookingFlightUserFormComponent/>
            </CardContent>
            <CardActions>
                <Grid container columns={2} spacing={2}>
                    <Grid item xs={1}>
                        <Button fullWidth variant={"outlined"}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button fullWidth variant={"contained"} >
                            <Typography variant={"button"} sx={{paddingRight: 4}}>
                                Proceed to Checkout
                            </Typography>
                            <Typography sx={{borderLeft: '1px solid white', paddingLeft: 4}}>
                                {`$${totalAmount}`}
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}