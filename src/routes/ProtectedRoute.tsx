import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedRoute() {
    // import the isAuthenticated state
    const { isAuthenticated } = useAuth();

    // add conditional if the user isn't uthenticated and tries to reach a protected route, navigate to the login page 
    if (!isAuthenticated) {
        // replace resets the history so the user can't go back to get to the protected page
        return <Navigate to="/login" replace />
    }

    // return whatever the protected page is the child
    return <Outlet/>
}