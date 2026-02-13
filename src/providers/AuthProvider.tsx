// AUTH PROVIDER - keeps track of if the user is logged in or not to visit protected frontend routes
import { useState } from "react";
import { AuthContext, type AuthContextTypes } from "../contexts/AuthContext";
import type { User } from "../types";

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    // set up the auth state - whether user is authenticated or not
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // set up the stored user
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    // Provider functions
    // Login - takes in the successfully sent token from the cookie and current user in state
    function login(user: User) {
        console.log('User logging in or creating account');

        // store the user
        setCurrentUser(user);
        // set auth state to true
        setIsAuthenticated(true);

        // REMOVE THIS IS FOR DEBUGGING!
        console.log(user);
    }

    // Logout - restore everything to default
    function logout() {
        setCurrentUser(null);
        setIsAuthenticated(false);

        console.log('User is logged out');
    }

    // set up the values
    const value: AuthContextTypes = {
        isAuthenticated: isAuthenticated,
        currentUser: currentUser,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}