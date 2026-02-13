// AUTH PROVIDER - keeps track of if the user is logged in or not to visit protected frontend routes
import { useEffect, useState } from "react";
import { AuthContext, type AuthContextTypes } from "../contexts/AuthContext";
import type { User } from "../types";
import { axiosInstance } from "../services/axios";

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    // set up the auth state - whether user is authenticated or not
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // set up the stored user
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    // state for if auth is being checked so protected components dont fail on mount and redirect
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    // Auth check in useEffect with the api/users/me route on every mount/refresh - if token was verified, keep them on the page, if not, go to login screen
    useEffect(() => {
        async function checkAuthStatus(){
            try {
                // check success from token w/ me route
                const response = await axiosInstance.get("/api/users/me");
                // store user response in state, update isAuthenticated state
                setCurrentUser(response.data);
                setIsAuthenticated(true);

            } catch (error) {
                // TODO: add different behavior for a 401 vs a 500 - add error page for 500s
                console.log("Error authenticating user", error);
                setCurrentUser(null);
                setIsAuthenticated(false);
            } finally {
                // whatever the resolve, set the checking state to false
                setIsCheckingAuth(false)
            }
        }

        // call function
        checkAuthStatus();
    }, [])

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
        isCheckingAuth: isCheckingAuth,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}