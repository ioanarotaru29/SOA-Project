import {createSlice} from "@reduxjs/toolkit";
import {createBooking, getFlight} from "./bookingsApi";

export const bookingsSlice = createSlice({
    name: 'bookingsSlice',
    initialState: {
        user: {},
        flight: {},
        selectedPackageId: -1,
        totalAmount: 0,
        isProcessing: false,
        processingFailed: false,
        processingSuccess: false
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
        },
        setPackage: (state, action) => {
            state.selectedPackageId = action.payload;
            state.totalAmount = state.flight.packages.find(pack => pack.id === action.payload).amount;
        },
        startProcess: (state) => {
            state.isProcessing = true;
            state.processingSuccess = false;
            state.processingFailed = false;
        },
        successProcess: (state) => {
            state.isProcessing = false;
            state.processingSuccess = true;
            state.processingFailed = false;
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

export const checkoutAction = (user, packageId) => async (dispatch) => {
    try {
        dispatch(startProcess());

        await createBooking(user.id, packageId, user.token);
        dispatch(successProcess());
    }catch (e) {
        dispatch(failedProcess());
        console.log(e);
    }
}
