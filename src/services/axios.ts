import axios from "axios";
import { getAuthToken } from "./authToken";

// create an instance of axios with backend url
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000,
    headers: {
        // this tells the backend that JSON is being sent in the req body for POST, PUT requests
        'Content-Type': 'application/json',
    }
});

// Interceptor is going to add the token from authToken.ts to every request before the .then.catch train runs when the protected route is made
axiosInstance.interceptors.request.use(
    (request) => {
        const authToken = getAuthToken();
        
        // if authToken exists, add it to the Authorization head
        if (authToken) {
            request.headers['Authorization'] = `Bearer ${authToken}`;
        }
        return request;
    }, 
    (error) => {
        return Promise.reject(error);
    }
);