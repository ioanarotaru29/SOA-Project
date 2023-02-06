import axios from 'axios';

const baseUrl = 'localhost:3000';
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const getFlights = async (filterData) => {
    const params = {
        params: {
            source: filterData?.source !== '' ? filterData.source : null,
            destination: filterData?.destination !== '' ? filterData.destination : null,
            departureStart: filterData?.startDate ? filterData.startDate : null,
            departureEnd: filterData?.endDate ? filterData.endDate : null
        }
    }
    return await axios.get(`http://${baseUrl}/flights`, params, config).then(res => res.data);
}
export const getSources = async () => {
    return await axios.get(`http://${baseUrl}/flights/sources`, config).then(res => res.data);
}
export const getDestinations = async () => {
    return await axios.get(`http://${baseUrl}/flights/destinations`, config).then(res => res.data);
}