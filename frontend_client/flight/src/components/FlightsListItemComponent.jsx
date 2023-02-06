import {
    Box, Button,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Divider,
    Grid,
    IconButton,
    styled,
    Typography
} from "@mui/material";
import {FlightLand, FlightTakeoff} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useState} from "react";
import React from "react";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

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


export default function FlightListItemComponent({item, onClickEvent}) {
    const date = new Date(item.departure);
    const dateEnd = new Date(item.departureEnd);
    const minPackage = item.packages.reduce((previousValue, currentValue) =>
        previousValue.amount < currentValue.amount ? previousValue : currentValue)

    const computeDateDiff = (dateStart, dateEnd) => {
        const seconds = Math.floor((dateEnd - (dateStart)) / 1000);
        let minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        minutes = minutes - (hours * 60);
        return {hours, minutes};
    }

    return (
        <Card sx={{width: '100%', my: 1}} elevation={2}>
            <CardContent>
                <Grid container spacing={2} columns={4}>
                    <Grid item xs={1} sx={{display: 'flex', alignItems: 'center'}}>
                        <FlightTakeoff color={"disabled"} sx={{mx: 2}}/>
                        <Box sx={{display: 'flex', alignItems: 'baseline'}}>
                            <Box sx={{display: 'flex', alignItems: 'center', mt: 2, flexDirection: "column"}}>
                                <Typography variant="body1" color="text.secondary" fontWeight={"bold"} textAlign={"center"}
                                            sx={{mx: 1}}>
                                    {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </Typography>
                                <Typography variant={"caption"} color={"text.secondary"} fontWeight={"lighter"}>
                                    {date.toLocaleDateString([], {month: 'short', day: 'numeric' })}
                                </Typography>
                            </Box>
                            <Typography variant="body" color="text.secondary">{item.source}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <ArrowDivider/>
                        <Box sx={{display: "flex", justifyContent: "center"}}>
                            <Typography display={"block"} variant="caption" color="text.secondary" fontWeight={"bold"} textAlign={"center"}
                                    sx={{mx: 1}}>
                                {`${computeDateDiff(date, dateEnd).hours}h ${computeDateDiff(date, dateEnd).minutes}m`}
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
                                    {dateEnd.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </Typography>
                                <Typography variant={"caption"} color={"text.secondary"} fontWeight={"lighter"}>
                                    {dateEnd.toLocaleDateString([], {month: 'short', day: 'numeric' })}
                                </Typography>
                            </Box>
                            <Typography variant="body" color="text.secondary">{item.destination}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={1} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', borderLeft: '1px solid rgba(0, 0, 0, 0.26)', mt: 1}}>
                        <Typography variant="body2" color="text.secondary"
                                    sx={{mx: 1}}>
                            Starting from:
                        </Typography>
                        <Typography variant="h6" color="text.secondary" fontWeight={"bold"}
                                    sx={{mx: 1}}>
                            {`$${minPackage.amount}`}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={"lighter"}
                                    sx={{mx: 1}}>
                            {minPackage.description}
                        </Typography>
                        <Button variant={"contained"} color={"primary"} onClick={()=> onClickEvent(item.id)}>Reserve</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}