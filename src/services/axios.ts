import axios from "axios";

// create an instance of axios with backend url
export const axiosInstance = axios.create({
    // add "" for the vite proxy to work and comment out api_url in .env when in development
    baseURL: import.meta.env.VITE_API_URL || "",
    // set timeout to 15s to accommodate cold start or slow networks
    timeout: 15000,
    headers: {
        // this tells the backend that JSON is being sent in the req body for POST, PUT requests
        'Content-Type': 'application/json',
    },
    // automatically send cookie token on requests
    withCredentials: true
});