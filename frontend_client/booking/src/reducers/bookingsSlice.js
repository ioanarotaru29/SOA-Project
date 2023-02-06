import {createSlice} from "@reduxjs/toolkit";
import {getFlight} from "./bookingsApi";

export const bookingsSlice = createSlice({
    name: 'bookingsSlice',
    initialState: {
        user: {},
        flight: {},
        selectedPackageId: -1,
        totalAmount: 0
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        fetchFlight: (state, action) => {
            state.flight = action.payload ? action.payload : {}
            if (action.payload) {
                const minPackage = action.payload.packages.reduce((previousValue, currentValue) => previousValue.amount < currentValue.amount ? previousValue : currentValue)
                state.selectedPackageId = minPackage.id;
                state.totalAmount = minPackage.amount;
            }
        }
    }
})

export const { setUser, fetchFlight } = bookingsSlice.actions;

export const setUserAction = (user) => async (dispatch) => {
    dispatch(setUser(user));
}

export const fetchFlightAction = (flightId) => async (dispatch) => {
    try {
        const flight = await getFlight(flightId);
        dispatch(fetchFlight(flight));
    } catch (e){
        console.log(e);
    }
}
