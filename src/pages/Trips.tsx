import { useEffect, useState } from "react";
import TripForm from "../components/TripForm"
import { useAuth } from "../contexts/AuthContext";
import { axiosInstance } from "../services/axios";
import type { User } from "../types";
import BoardingPass from "../components/BoardingPass";

export default function Trips() {
    const { isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // always update the user!
    const [profileUser, setProfileUser] = useState<User | null>(null);

    // pull this out of the useEffect to be used in the prop for UI refresh after a trip is created so the new boarding pass is showing
    async function fetchUser() {
        try {
            const response = await axiosInstance.get("/api/users/me");
            setProfileUser(response.data);
        } catch (error: any) {
            setError(error.response.data.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();

    }, [isAuthenticated]);

    // use optional chaining in case user isn't loaded
    const trips = profileUser?.trips ?? [];

    // check for spending stats
    const plannedForTrip = (tripId: string) => {
        const groupOfActivities = profileUser?.activities?.find((group) => group.tripId === tripId);
        if (!groupOfActivities) return 0;

        return groupOfActivities.activityIds.reduce((sum: number, act: any) => {
            return sum + (act?.price ?? 0);
        }, 0);
    };

    // check for staats
    const totalTrips = trips.length;
    // get the total number of activities across all trips
    const totalActivities = trips.reduce((sum, trip) => {
        return sum + (trip.activities?.length ?? 0);
    }, 0);

    return (
        <div className="min-h-screen p-10 flex flex-col gap-4">
            {/* CTA for form - conditional view based off if the user has trips or not yet */}
            <div className="px-40 self-center">
                <TripForm onCreatedTrip={fetchUser}/>
            </div>

            <h2>Your Trips</h2>
            {loading && <h3 className="px-0 md:px-0">Loading your trips</h3>}
            {/* conditional loading messages */}
            {error && (
                <div className="p-6 bg-red-400 rounded-xl">
                    <h3>Uh oh... There was a problem getting your trips!</h3>
                    <h3>Please refresh or log back in.</h3>
                </div>
            )}
            {/* user's trips - all of the boarding passes they can browse */}
            <div className="px-[10vw] md:px-[20vw]">
                {!loading && !error && profileUser && trips.length === 0 &&
                    <h3 className="opacity-70">No trips yet — create one above.</h3>
                }
                {!loading && !error && profileUser && trips.length > 0 && (
                    <div className="flex flex-col gap-4">
                        {trips.map((trip) => (
                            <BoardingPass
                                key={trip._id}
                                trip={trip}
                                planned={plannedForTrip(trip._id)}
                            />
                        ))}
                    </div>
                )}
            </div>
            {/* trip stats - how many they have planned, how much money they intend to spend and their budgets */}
            <h2>Trips Stats</h2>
            {error && <p className="opacity-70">There was an error loading your stats. Please refresh or log back in.</p>}
            {profileUser && trips.length > 0 && 
                <p>You have {totalTrips} trip{totalTrips !== 1 && "s"} planned and{" "} {totalActivities} activit{totalActivities === 1 ? "y" : "ies"} in total.</p>
            }
        
        </div>
    )
}