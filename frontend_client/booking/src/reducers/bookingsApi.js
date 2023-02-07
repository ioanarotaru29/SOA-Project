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

export const createBooking = async (userId, pack, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    return await axios.post(`http://${baseUrl}/bookings/`, {userId: userId,
        packageId: pack.id,
        amount: pack.amount,
        name: pack.description,
        redirectUrl: window.location.href,
        }, config).then(res => res.data)
}