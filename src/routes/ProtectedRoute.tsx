import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function ProtectedRoute() {
    // import the isAuthenticated state
    const { isAuthenticated, isCheckingAuth } = useAuth();

    // state to avoid flash of the loader if the auth check is quick - is initialized opposite isChecking state - normal nav, auth check already happened so it's false and minload is true. On refresh isChecking is true, so it needs to be false to trigger the timer
    const [minLoadTimeReached, setMinLoadTimeReached] = useState(!isCheckingAuth);

    // useEffect - only run this if an auth check is in progress - only done on mount
    useEffect(() => {
        if (isCheckingAuth) {
            const timer = setTimeout(() => {
                setMinLoadTimeReached(true)
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [])

    // use state variable to stall the login redirect while waiting for the auth state to be determined
    // loading logic - it needs to show loader while either isChecking is true or if the minloadtime hasn't been reached yet / this only triggers on refresh
    if (isCheckingAuth || !minLoadTimeReached) {
        return (
            <div className="h-screen fixed inset-0 flex flex-col justify-center items-center">
                <motion.img 
                    animate={{ y: [0, -5, 0], opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2}}
                    src="/logovert.svg"
                />
                <p className="font-dela text-xl">Your Adventure Awaits...</p>
            </div>
        )
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