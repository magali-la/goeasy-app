// TYPES FOR DATA FROM THE BACKEND

// Provider type - how the user signed up
export type Providers = 'local' | 'google';

// User Type - user object fields from the backend that will be used in the UI
export interface User {
    _id: string;
    username: string;
    email: string;
    provider: Providers;
    // the timestamp will come back as well for profile
    createdAt: string;
    updatedAt: string;    
}

// Auth Response - the shape of the response the backend sends to the client for login/signup/google oauth routes
export interface AuthResponse {
    user: User;
}