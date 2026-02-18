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

    useEffect(() => {
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

        fetchUser();

    }, [isAuthenticated]);

    // add guards for loading and errors
    if (loading) return <div className="p-10">Loading...</div>;
    if (error) return <div className="p-10">Error: {error}</div>;
    if (!profileUser) return <div className="p-10">No user data</div>;

    // use nonnull assertion
    const trips = profileUser!.trips ?? [];

    // check for spending stats
    const plannedForTrip = (tripId: string) => {
    const group = profileUser.activities?.find((g) => g.tripId === tripId);
    if (!group) return 0;

    return group.activityIds.reduce((sum: number, act: any) => {
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
                <TripForm/>
            </div>

            <h2>Your Trips</h2>
            {/* user's trips - all of the boarding passes they can browse */}
            <div className="px-[10vw] md:px-[20vw]">
                {trips.length === 0 ? (
                    <p className="opacity-70">No trips yet — create one above.</p>
                ) : (
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
            <p>You have {totalTrips} trip{totalTrips !== 1 && "s"} planned and{" "} {totalActivities} activit{totalActivities === 1 ? "y" : "ies"} in total.</p>
        
        </div>
    )
}