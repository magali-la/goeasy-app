import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../services/axios";
import Button from "../components/Button";
import { motion } from "motion/react";

export default function TripDetail() {
    // take the tripId from the params
    const { tripId } = useParams();
    const navigate = useNavigate();

    // set a loading states and errors
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [trip, setTrip] = useState<any>(null);

    // state for editing trip
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("planning");
    const [saving, setSaving] = useState(false);
    const [editError, setEditError] = useState("");

    // on mount get the trip
    useEffect(() => {
        async function fetchTrip() {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/api/trips/${tripId}`);

                // set the trip in state
                setTrip(response.data);

                // take this data to populate the edit form states
                setTitle(response.data.title || "");
                setDescription(response.data.description || "");
                setStartDate((response.data.startDate || "").slice(0, 10));
                setEndDate((response.data.endDate || "").slice(0, 10));
                setStatus(response.data.status || "planning");

            } catch (error: any) {
                setError(error.response.data.message);
            } finally {
                setLoading(false);
            }
        }

        fetchTrip();
    }, [tripId]);

    // save handler for edit mode
    async function handleSave(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setEditError("");

        try {
            // start saving mode
            setSaving(true);

            // run the request with the state varibles
            const response = await axiosInstance.put(`/api/trips/${tripId}`, {
                title,
                description,
                startDate,
                endDate,
                status
            });

            console.log("PUT response:", response.data);

            // hit a refresh to make sure that the tags and activity data is up to date and avoid errors
            const refreshed = await axiosInstance.get(`/api/trips/${tripId}`)

            // set the trip again to make sure it's updated
            setTrip(refreshed.data);
            setIsEditing(false);

        } catch (error: any) {
            setEditError(error.message)
        } finally {
            setSaving(false)
        }
    }

    // delete a trip
    async function handleDeleteTrip() {
        const ok = window.confirm("Delete this trip? This can't be undone.");
        if (!ok) return;

        try {
            await axiosInstance.delete(`/api/trips/${tripId}`);
            navigate("/trips");
        } catch {
            alert("Failed to delete trip.");
        }
    }

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
            {/* conditionl label based off editing status */}
            <Button shape="md" label={isEditing ? "Close" : "Edit Trip"} className="bg-lav w-fit" onClick={() => setIsEditing((v) => !v)}/>

            {/* conditionl render of the edit form */}
            {isEditing && (
                <form onSubmit={handleSave} className="rounded-2xl bg-litemustard p-6 flex flex-col gap-4">
                    <label className="font-medium">Trip Name</label>
                    <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />

                    <label className="font-medium">Description</label>
                    <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} />

                    <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex gap-3 items-center">
                        <label className="font-medium">Start Date</label>
                        <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
                    </div>

                    <div className="flex gap-3 items-center">
                        <label className="font-medium">End Date</label>
                        <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
                    </div>
                    </div>

                    <label className="font-medium">Status</label>
                    <select value={status} onChange={(event) => setStatus(event.target.value)}>
                        <option value="planning">planning</option>
                        <option value="upcoming">upcoming</option>
                        <option value="ongoing">ongoing</option>
                        <option value="archived">archived</option>
                    </select>

                    {editError && <p className="text-red-800">{editError}</p>}

                    <Button type="submit" shape="md" label={saving ? "Saving..." : "Save Changes"} className="bg-leaf w-fit self-center"
                    />
                    <Button type="button" shape="sm" label="Delete Trip" className="bg-red-400 font-normal w-fit self-center" onClick={handleDeleteTrip}
                    />
                </form>
            )}

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
                                    {/* add guard bc after update the route for updating doesnt repopulate the full activity objects */}
                                    {(activity.tags || []).map((tag) => (
                                        <span key={tag} className="px-3 py-1 rounded-full text-base bg-sea">{tag}</span>
                                    ))}
                                </div>

                                {/* button to add to trip */}
                                <Button shape="sm" label="Delete from Trip" className="bg-red-400 mt-2 self-center" onClick={() => handleDeleteActivity(activity._id)}/>
                            </div>
                        </motion.div>
                    ))}
                </section>

        </div>
    )
}