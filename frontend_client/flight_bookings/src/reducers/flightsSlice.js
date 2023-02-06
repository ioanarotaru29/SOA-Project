import {createSlice} from '@reduxjs/toolkit';
import {getDestinations, getFlights, getSources} from "./flightsApi";

export const flightsSlice = createSlice({
    name: 'flightsSlice',
    initialState: {
        filters: {
            sources: [],
            destinations: []
        },
        flights: []
    },
    reducers: {
        fetchFlights: (state, action) => {
            state.flights = action.payload
        },
        fetchFilters: (state, action) => {
            state.filters = action.payload
        }
    }
    }
)
export const { fetchFlights, fetchFilters } = flightsSlice.actions;

export const fetchFlightsAction = () => async (dispatch) => {
    try {
        const flights = await getFlights({});
        dispatch(fetchFlights(flights));
    } catch (e){
        console.log(e);
    }
}

export const fetchFiltersAction = () => async (dispatch) => {
    try {
        const sources = await getSources();
        const destinations = await getDestinations();
        dispatch(fetchFilters({sources, destinations}));
    } catch (e){
        console.log(e);
    }
}

export const filterFlightsAction = (source, destination, startDate, endDate) => async (dispatch) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    try {
        const flights = await getFlights({
            source,
            destination,
            startDate: startDate ?
                `${start.getFullYear()}/${start.getMonth() + 1}/${start.getDate()} ${start.toLocaleTimeString()}` : null,
            endDate: endDate ? `${end.getFullYear()}/${end.getMonth() + 1}/${end.getDate()} ${end.toLocaleTimeString()}` : null
        })
        dispatch(fetchFlights(flights));
    } catch (e) {
        console.log(e);
    }
}
