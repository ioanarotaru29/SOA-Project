import axios from 'axios';

const baseUrl = 'localhost:3010';
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};
export const signinApi = async (email, password) => {
    return await axios.post(`http://${baseUrl}/sign_in`, { username: email, password: password }, config).then(res => res.data);
}

export const signupApi = async (email, password, firstName, lastName) => {
    return await axios.post(`http://${baseUrl}/sign_up`, { email, password, firstName, lastName}, config).then(res => res.data);
}