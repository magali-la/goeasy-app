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
    // add these to make sure you can get the data for spending calculations
    trips: Trip[]; 
    activities: {
        tripId: string;
        activityIds: any[]
    }[]
}

// Auth Response - the shape of the response the backend sends to the client for login/signup/google oauth routes
export interface AuthResponse {
    user: User;
}

// Trip type
export type TripStatus = "planning" | "upcoming" | "ongoing" | "archived";

export interface Trip {
    _id: string;
    title: string;
    description: string;
    city: "nyc" | "atlanta" | "lyon";
    startDate: string;
    endDate: string;
    isExact?: boolean;
    status: TripStatus;
    participants: string[];
    activities: {
        activityId: string;
        participants: string[];
    }[];
    createdAt: string;
    updatedAt: string;
}