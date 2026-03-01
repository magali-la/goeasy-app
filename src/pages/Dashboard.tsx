import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import type { User } from "../types";
import { axiosInstance } from "../services/axios";
import BoardingPass from "../components/BoardingPass";
import { useNavigate } from "react-router";
import Button from "../components/Button";

export default function Dashboard() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [profileUser, setProfileUser] = useState<User | null>(null);
    
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    
    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await axiosInstance.get("/api/users/me");
                setProfileUser(res.data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        if (isAuthenticated) {
            fetchUser();
        }
    }, [isAuthenticated]);

    // check for spending stats
    const plannedForTrip = (tripId: string) => {
        const groupOfActivities = profileUser?.activities?.find((group) => group.tripId === tripId);
        if (!groupOfActivities) return 0;

        return groupOfActivities.activityIds.reduce((sum: number, act: any) => {
            return sum + (act?.price ?? 0);
        }, 0);
    };

    return (
        <div className="min-h-screen flex flex-col gap-6 p-10">
            <h2>Your Recent Trips</h2>
            {/* conditional render for loading, request errors & no trips */}
            {loading && <h3 className="px-0 md:px-0">Loading your trips</h3>} {error && <h3>Uh oh... There was a problem getting your trips!</h3>}
            {!profileUser && <h3>No user data. Please log back in.</h3>}
            {profileUser && profileUser?.trips.length === 0 && <h3>You have no trips yet. Let's start planning!</h3>}
            
            <div className="flex flex-col gap-6 px-[10vw] md:px-[20vw]">
                {/* slice it and map them */}
                {profileUser && profileUser?.trips.length > 0 && profileUser.trips.slice(0, 3).map((trip) => (
                    <BoardingPass
                        key={trip._id}
                        trip={trip}
                        planned={plannedForTrip(trip._id)}
                    />
                ))}
            </div>
            {/* add trips cta */}
            <section aria-label="plan a new trip" className="flex flex-col md:flex-row justify-center gap-10 md:gap-20 md:items-center">
                <div className="flex flex-col gap-8">
                    <h2 className="">Ready to plan your next adventure?</h2>
                    <h3>You don’t need a plan yet. Just a place you’d rather be.</h3>
                    <Button shape="md" label="Plan a new trip" className="bg-leaf w-fit self-center" onClick={() => navigate("/trips")}/>
                </div>
                <img src="https://images.unsplash.com/photo-1760716052663-4285ce91e54e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="backpacker facing towards mountains" className="w-2/5 self-center rounded-3xl"/>
            </section>

            {/* explore activities cta */}
            <h2>Need inspiration?</h2>
            <h3>Explore our curated picks for cheap eats and fun events on a budget!</h3>
            <img src="https://images.unsplash.com/photo-1560833288-6c3291bf197e?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="group of people at an intimate outdoors food event sitting at a large table" className="w-2/5 self-center rounded-3xl"/>
            <Button shape="md" label="Explore activities" className="bg-sea w-fit self-center" onClick={() => navigate("/explore")}/>
        </div>
    )
}