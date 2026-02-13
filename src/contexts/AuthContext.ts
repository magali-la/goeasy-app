// AUTH CONTEXT - this is going to define the type for the auth context, 

import { createContext, useContext } from "react";
import type { User } from "../types";

// set up type for auth context and the provider functions
export interface AuthContextTypes {
    isAuthenticated: boolean;
    currentUser: User | null;
    // login is going to take in the backend response with the user to authenticate the user in the frontend for protected routes
    login: (user: User) => void;
    logout: () => void;
}

// name the AuthContext from the types
export const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

// useAuth custom hook will allow for components to actually use the context and provider functions. It checks that components using the hook are wrapped in auth provider and show error if not
export function useAuth(): AuthContextTypes {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth can only be used within the AuthProvider")
    }
    
    return context;
}
