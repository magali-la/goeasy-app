import axios from "axios";

// create an instance of axios with backend url
export const axiosInstance = axios.create({
    // TODO: once it's ready for production, include this in the code - for now it was overriding the vite proxy so the test requests were failing bc of cors blockers. the proxy is managing this for now
    // baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000,
    headers: {
        // this tells the backend that JSON is being sent in the req body for POST, PUT requests
        'Content-Type': 'application/json',
    },
    // automatically send cookie token on requests
    withCredentials: true
});