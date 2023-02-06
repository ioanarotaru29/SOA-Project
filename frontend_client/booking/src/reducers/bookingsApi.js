import axios from 'axios';

const baseUrl = 'localhost:3000';
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const getFlight = async (flightId) => {
    const flights = await axios.get(`http://${baseUrl}/flights/`, {params: {id: flightId}}, config).then(res => res.data);
    return flights.at(0);
}