import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { axiosInstance } from "../services/axios";
import Button from "../components/Button";
import { motion } from "motion/react";
import type { Trip } from "../types";
import TripStatusTag from "../components/TripStatusTag";
import TripEditForm from "../components/TripEditForm";

export default function TripDetail() {
    // take the tripId from the params
    const { tripId } = useParams();
    const navigate = useNavigate();

    // set a loading states and errors
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [trip, setTrip] = useState<Trip | null>(null);

    // state for editing trip
    const [isEditing, setIsEditing] = useState(false);

    async function fetchTrip() {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/api/trips/${tripId}`);

            // set the trip in state
            setTrip(response.data);

        } catch (error: any) {
            // switch statements to determine type of error messages to display to the user - add optional chaining, network issues won't have a response
            const errorStatus = error.response.status;

            switch (errorStatus) {
                case 401:
                    setError("unauthorized");
                    break;
                case 403:
                    setError("forbidden");
                    break;
                case 404:
                    setError("notfound");
                    break;
                case 500:
                    setError("general");
                    break;
                default:
                    setError("general");
            }
        } finally {
            setLoading(false);
        }
    }

    // on mount get the trip
    useEffect(() => {
        fetchTrip();
    }, [tripId]);

    // delete an activity
    async function handleDeleteActivity(activityId: string) {
        const ok = window.confirm("Delete activity from this trip? This can't be undone");
        if (!ok) return;

        try {
            await axiosInstance.delete(`/api/trips/${tripId}/activities/${activityId}`);
            window.location.reload();    
        } catch {
            alert("Failed to delete this activity");
        }
    }

    // format the city for the button
    function formatCity(city: string) {
        switch (city) {
            case "nyc":
                return "NYC";
            case "atlanta":
                return "Atlanta";
            case "lyon":
                return "Lyon";
            default:
                return city
        }
    }

    // loading and error handlers
    if (loading) return (
        <div className="min-h-screen">
            <h2 className="p-10">Loading trip...</h2>
        </div>
    );

    if (error) return (
        <div className="m-10 p-10 bg-red-400 rounded-xl">
            {/* general network or server errors */}
            {error === "general" && (
                <>
                    <h2>Uh oh... There was a problem getting your trip!</h2>
                    <h3>Please refresh or log back in.</h3>
                </>
            )}

            {/* unauthorized error */}
            {error === "unauthorized" && (
                <>
                    <h2>Uh oh... There was a problem getting your trip!</h2>
                    <h3>Please log back in.</h3>
                </>
            )}
            {error === "notfound" && (
                <>
                    <h2>Uh oh... This trip was not found!</h2>
                    <h3>Please go back to your trips.</h3>
                </>
            )}
            {error === "forbidden" && (
                <>
                    <h2>Uh oh... Not authorized to view this trip.</h2>
                    <h3>Please go back to your trips.</h3>
                </>
            )}
            <p>{error}</p>
        </div>
    );

    // activities is populated in this response so use it to map the data - optionl chaining for safety
    const activities = trip?.activities?.map((activity: any) => activity.activityId) ?? [];

    return (
        <div className="min-h-screen p-10 flex flex-col gap-4">
            {/* use optional chaining and non null coalescing for fallback for null trip type - the error and loading returns catch this anyway, but need it to avoid TS errors */}
            <div>
                <Link to="/trips" className="flex gap-2 mb-4 hover:font-medium transition-all duration-100 w-fit">
                    <i className="bi bi-arrow-left flex self-center"></i>
                    Back to Trips
                </Link>
                <h1 className="text-2xl md:text-3xl mb-2 md:mb-3">{trip?.title}</h1>
                <h2 className="flex flex-row gap-4 text-xl md:text-2xl">
                    <i className="bi bi-geo-fill opacity-80 text-berry"></i>
                    {formatCity(trip?.city ?? "")}
                </h2>

                {/* status tag */}
                <div className="my-2.5 md:my-4">
                    <TripStatusTag status={trip?.status ?? "planning"} />
                </div>

                <h3 className="text-lg md:text-xl mb-2 italic">
                    {new Date(trip?.startDate ?? "").toLocaleDateString()} – {new Date(trip?.endDate ?? "").toLocaleDateString()}
                </h3>
                <h4 className="text-base md:text-lg">{trip?.description}</h4>
            </div>
            {/* conditionl label based off editing status */}
            <Button shape="sm" label={isEditing ? "Close" : "Edit Trip"} className="bg-lav w-fit" onClick={() => setIsEditing((v) => !v)}/>

            {/* conditionl render of the edit form */}
            {isEditing && (
                // use non-null assertion for ts - it will never actually load the form if the url or trip isnt loaded due to error handling
                <TripEditForm tripId={tripId!} trip={trip!} onEditedTrip={async ()=> {
                    // refresh trip fetch with new data
                    await fetchTrip()
                    // then set isEditing false to close this
                    setIsEditing(false)
                }}/>
            )}

            <h2 className="text-2xl font-semibold">Planned Activities</h2>
            <section className=" grid grid-cols-1 md:grid-cols-3 gap-6" aria-label={`List of activities for ${tripId}`}>
                {/* map activities objects and get the right data */}
                {activities.length > 0 ? (
                    activities.map((activity) => (
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
                                    {/* add guard bc after update the route for updating doesnt repopulate the full activity objects */}
                                    {(activity.tags || []).map((tag) => (
                                        <span key={tag} className="px-3 py-1 rounded-full text-base bg-sea">{tag}</span>
                                    ))}
                                </div>

                                {/* button to add to trip */}
                                <Button shape="sm" label="Delete from Trip" className="bg-red-400 mt-2 self-center" onClick={() => handleDeleteActivity(activity._id)}/>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div>
                        <h3 className="opacity-70">No activities yet. Want to start planning?</h3>
                        <Button shape="sm" label={`Explore activities in ${formatCity(trip?.city ?? "")}`} className="bg-sea mt-2" onClick={() => navigate(`/explore/${trip?.city ?? ""}`)}/>
                    </div>
                )}
            </section>
        </div>
    )
}