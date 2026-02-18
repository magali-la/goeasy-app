import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosInstance } from "../services/axios";
import { motion } from "motion/react";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";

// activity interface - shape of the data in mongodb
export interface Activity {
    _id: string;
    title: string;
    description?: string;
    location: string;
    city: 'nyc' | 'atlanta' | 'lyon';
    price: number;
    imageUrl: string;
    tags: string[];
}

export default function ExploreCity() {
    // take the cityId from the params
    const { cityId } = useParams();
    // set state for the activities array that's returned
    const [activities, setActivities] = useState<Activity[]>([]);
    // set a loading stats and errors
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // add state to store the trips and selected trip to add an activity
    const { currentUser } = useAuth();
    const [userTrips, setUserTrips] = useState<any[]>([]);
    const [selectedTripId, setSelectedTripId] = useState<string>("");

    // useEffect when the page mounts, get the necessary info from the database based off the param
    useEffect(() => {
        async function fetchCityActivities() {

            try {
                setLoading(true);
                // reset error in case there was one before
                setError("");

                // fetch with axios
                const response = await axiosInstance.get(`/api/activities/city/${cityId}`);

                // set it in state to map through it
                setActivities(response.data);
            } catch (error: any) {
                setError("Failed to load activities.");
                console.log(error);
            } finally {
                // whtever happens, get it out of its loading state
                setLoading(false);
            }
        }

        fetchCityActivities()
    }, [cityId]);

    // use effect to fetch the user and get most updated version
    useEffect(() => {
        async function fetchUser() {
            const response = await axiosInstance.get("/api/users/me");
            // take the trips from this user to use it for a list - these are populated
            setUserTrips(response.data.trips || []);

            // conditional logic to set the trips in the dropdown 
            if ((response.data.trips || []).length > 0) {
                setSelectedTripId(response.data.trips[0]._id);
            }
        }
        fetchUser();
    }, []);

    // handler for adding an activity to a trip
    async function handleAddToTrip(activityId: string) {
        if (!selectedTripId) {
            alert("Create a trip first (go to Trips page).");
            return;
        }

        try {
            await axiosInstance.post(`/api/trips/${selectedTripId}/activities`, {
            activityId,
            participants: [currentUser!._id], // simplest for demo
            });
            alert("Added to trip!");
        } catch (error: any) {
            alert(error?.response?.data?.message || "Failed to add activity.");
        }
    }

    return (
        <div className="min-h-screen p-10 flex flex-col gap-4">
            <h1 className="capitalize">Explore Activities in {cityId}</h1>

            {/* set loading and error states */}
            {loading && <p className="text-lg">Loading Activities...</p>}
            {error && <p className=" text-red-800">{error}</p>}

            {/* conditional dropdown menu to add to a trip */}
            {userTrips.length > 0 ? (
                <div className="flex items-center gap-3">
                    <p className="font-medium">Add activities to:</p>
                    <select value={selectedTripId} onChange={(event) => setSelectedTripId(event.target.value)} className="rounded-lg px-3 py-2">
                        {/* map the user's trips as options for the dropdown */}
                        {userTrips.map((trip) => (
                            <option key={trip._id} value={trip._id}>
                                {trip.title}
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                <p className="opacity-70">No trips yet — create one in Trips first.</p>
            )}

            {/* share the activities when it's not loading or error */}
            {!loading && !error && (
                <section className=" grid grid-cols-1 md:grid-cols-3 gap-6" aria-label={`List of activities for ${cityId}`}>
                    {/* map activities objects and get the right data */}
                    {activities.map((activity) => (
                        <motion.div key={activity._id} className="h-fit rounded-2xl overflow-hidden shadow-md" whileHover={{ scale: 1.05, transition: { duration: 0.5 }}}>
                            {/* image */}
                            <img src={activity.imageUrl} alt={`Image of ${cityId}`} className="h-36 w-full object-cover"/>

                            {/* content */}
                            <div className="p-4 flex flex-col">
                                {/* title / location / city */}
                                <div className="flex flex-row flex-nowrap gap-3 justify-start">
                                    <h2 className="font-dela text-lg">{activity.title}</h2>
                                    <p className="text-sm opacity-80">{activity.location}</p>
                                    <p className="text-sm italic opacity-70 capitalize">{activity.city}</p>
                                </div>

                                {/* price */}
                                <p className="mt-1 text-sm font-semibold opacity-80">Average price: ${activity.price}</p>

                                {/* description */}
                                <p className="mt-3 text-sm">{activity.description}</p>

                                {/* tags */}
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {activity.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 rounded-full text-base bg-sea">{tag}</span>
                                    ))}
                                </div>

                                {/* button to add to trip */}
                                <Button shape="sm" label="Add to Trip" className="bg-leaf mt-2 self-center" onClick={() => handleAddToTrip(activity._id)}/>
                            </div>
                        </motion.div>
                    ))}
                </section>
            )}
        </div>
    )
}