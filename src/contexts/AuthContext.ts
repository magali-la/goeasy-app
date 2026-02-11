// AUTH CONTEXT - this is going to define the type for the auth context, 

import { createContext, useContext } from "react";
import type { User } from "../types";

// set up type for auth context and the provider functions
export interface AuthContextTypes {
    isAuthenticated: boolean;
    // login is going to take in the backend response with the token and user to authenticate the user in the frontend for protected routes
    login: (token: string, user: User) => void;
    logout: () => void;
}

// name the AuthContext from the types
export const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

// useAuth custom hook will allow for components to actually use the context. It checks that components using the hook are wrapped in auth provider and show error if not - in this case, everything is wrapped by auth provider in main.tsx, but this also helps clear errors with ts when importing the context because the type could be undefined. this hook just checks if the context is able to be used or not (undefined or not and returns it wherever you are importing it)
export function useAuth(): AuthContextTypes {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth can only be used within the AuthProvider")
    }
    
    return context;
}
