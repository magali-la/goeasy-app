import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosInstance } from "../services/axios";
import Button from "../components/Button";
import { motion } from "motion/react";

export default function TripDetail() {
    // take the tripId from the params
    const { tripId } = useParams();

    // set a loading states and errors
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [trip, setTrip] = useState<any>(null);

    // on mount get the trip
    useEffect(() => {
        async function fetchTrip() {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/api/trips/${tripId}`);

                // set the trip in state
                setTrip(response.data);
            } catch (error: any) {
                setError(error.response.data.message);
            } finally {
                setLoading(false);
            }
        }

        fetchTrip();
    }, [tripId]);

    // loading and error handlers
    if (loading) return <div className="p-10">Loading trip...</div>;
    if (error) return <div className="p-10">Error: {error}</div>;
    if (!trip) return <div className="p-10">No trip found.</div>;

    // activities is populated in this response so use it to map the data - optionl chaining for safety
    const activities = trip.activities?.map((activity: any) => activity.activityId) ?? [];

    return (
        <div className="min-h-screen p-10 flex flex-col gap-4">
            <div>
                <h1>{trip.title}</h1>
                <h3 className="">
                    {new Date(trip.startDate).toLocaleDateString()} –{" "}
                    {new Date(trip.endDate).toLocaleDateString()}
                </h3>
            </div>
            <h2 className="text-2xl font-semibold">Planned Activities</h2>
            <section className=" grid grid-cols-1 md:grid-cols-3 gap-6" aria-label={`List of activities for ${tripId}`}>
                    {/* map activities objects and get the right data */}
                    {activities.map((activity) => (
                        <motion.div key={activity._id} className="h-fit rounded-2xl overflow-hidden shadow-md" whileHover={{ scale: 1.05, transition: { duration: 0.5 }}}>
                            {/* image */}
                            <img src={activity.imageUrl} alt={`Image of ${tripId}`} className="h-36 w-full object-cover"/>

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
                                <Button shape="sm" label="Add to Trip" className="bg-leaf mt-2 self-center"/>
                            </div>
                        </motion.div>
                    ))}
                </section>

        </div>
    )
}