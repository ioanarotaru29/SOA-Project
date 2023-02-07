import {createSlice} from "@reduxjs/toolkit";
import {createBooking, getFlight} from "./bookingsApi";

export const bookingsSlice = createSlice({
    name: 'bookingsSlice',
    initialState: {
        user: {},
        flight: {},
        selectedPackage: {},
        totalAmount: 0,
        isProcessing: false,
        processingFailed: false,
        processingSuccess: false,
        payUrl: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        fetchFlight: (state, action) => {
            state.flight = action.payload ? action.payload : {}
            if (action.payload) {
                const minPackage = action.payload.packages.reduce((previousValue, currentValue) => previousValue.amount < currentValue.amount ? previousValue : currentValue)
                state.selectedPackage = minPackage;
                state.totalAmount = minPackage.amount;
            }
        },
        setPackage: (state, action) => {
            state.selectedPackage = state.flight.packages.find(pack => pack.id === action.payload);
            state.totalAmount = state.flight.packages.find(pack => pack.id === action.payload).amount;
        },
        startProcess: (state) => {
            state.isProcessing = true;
            state.processingSuccess = false;
            state.processingFailed = false;
        },
        successProcess: (state, action) => {
            state.isProcessing = false;
            state.processingSuccess = true;
            state.processingFailed = false;
            state.payUrl = action.payload;
        },
        failedProcess: (state) => {
            state.isProcessing = false;
            state.processingSuccess = false;
            state.processingFailed = true;
        }
    }
})

export const { setUser, fetchFlight, setPackage, startProcess, successProcess, failedProcess } = bookingsSlice.actions;

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

export const selectPackageAction = (packageId) => async (dispatch) => {
    dispatch(setPackage(packageId));
}

export const checkoutAction = (user, pack) => async (dispatch) => {
    try {
        dispatch(startProcess());

        const url = await createBooking(user.id, pack, user.token);
        dispatch(successProcess(url));
    }catch (e) {
        dispatch(failedProcess());
        console.log(e);
    }
}
