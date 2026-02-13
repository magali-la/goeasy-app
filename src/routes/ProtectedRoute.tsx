import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedRoute() {
    // import the isAuthenticated state
    const { isAuthenticated, isCheckingAuth } = useAuth();

    // use state variable to stall redirect while waiting for the auth state to be determined
    if (isCheckingAuth) {
        // todo: some type of loading state when user refreshes app on protected route
        return <p>Loading page!</p>
    } else {
        // add conditional if the user isn't authenticated and tries to reach a protected route, navigate to the login page 
        if (!isAuthenticated) {
            // replace resets the history so the user can't go back to get to the protected page
            return <Navigate to="/login" replace />
        } else {
            // return whatever the protected page is the child
            return <Outlet/>
        }
    }
}