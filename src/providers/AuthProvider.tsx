// AUTH PROVIDER - keeps track of if the user is logged in or not to visit protected frontend routes and stored the token

import { useState } from "react";
import { AuthContext, type AuthContextTypes } from "../contexts/AuthContext";
import type { User } from "../types";
import { storeToken } from "../services/authToken";

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    // set up the auth state - whether user is authenticated or not
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // set up the stored user & token
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [currentToken, setCurrentToken] = useState<string | null>(null);

    // Provider functions
    // Login - takes in the successfully sent token and current user in state
    function login(token: string, user: User) {
        console.log('User logging in or creating account');

        // store the token
        setCurrentToken(token);
        // store the user
        setCurrentUser(user);
        // set auth state to true
        setIsAuthenticated(true);

        // import utility from authToken to store it there for axios' use in requests
        storeToken(token);

        // REMOVE THIS IS FOR DEBUGGING!
        console.log(user);
        console.log(token);
    }

    // Logout - restore everything to default
    function logout() {
        setCurrentToken(null);
        setCurrentUser(null);
        setIsAuthenticated(false);

        console.log('User is logged out');

    }

    // set up the values
    const value: AuthContextTypes = {
        isAuthenticated: isAuthenticated,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}