import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { axiosInstance } from "../services/axios";
import Button from "./Button";

// interface for prop so that UI refreshes in Trips after new trip is created, refetch user to display new trip's boarding pass in UI
interface TripFormProps {
    onCreatedTrip: () => void;
}

export default function TripForm({ onCreatedTrip }: TripFormProps) {
    // get the user from the auth context
    const { currentUser } = useAuth();
    // set state for controlled components
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [city, setCity] = useState<"nyc" | "atlanta" | "lyon">("nyc");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isExact, setIsExact] = useState(true);

    // error handling state & loading state for the form submission
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);


    // handler for trip submittion
    async function handleCreateTrip(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        // start off with no errors in case they're left behind
        setError("");

        // missing fields
        if (!title || !description || !city || !startDate || !endDate) {
            setError("Please fill out all required fields.");
            return;
        }

        try {
            setSubmitting(true);
            // build the trip with the input
            const newTrip = {
                title,
                description,
                city,
                startDate,
                endDate,
                isExact,
                status: "planning",
                participants: [currentUser!._id],
            }

            await axiosInstance.post("/api/trips", newTrip);

            // reset the form
            setTitle("");
            setDescription("");
            setCity("nyc");
            setStartDate("");
            setEndDate("");
            setIsExact(true);

            // parent Trips page runs this to refetch user
            onCreatedTrip();

        } catch (error: any) {
            setError(error.response.data.message)
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form className="rounded-2xl bg-litemustard p-6 flex flex-col gap-4 w-fit" onSubmit={handleCreateTrip} noValidate aria-label="create a trip">
            <h2>Plan your next adventure</h2>

            <label htmlFor="tripName" className="font-medium text-lg self-start">Trip Name</label>
            <input id="tripName" type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. NYC Girls Trip"/>

            <label htmlFor="city" className="font-medium">Location</label>
            <select id="city" value={city} onChange={(event) => setCity(event.target.value as any)}>
                <option value="nyc">New York City</option>
                <option value="atlanta">Atlanta</option>
                <option value="lyon">Lyon</option>
            </select>

            <label htmlFor="description" className="font-medium">Description</label>
            <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="What’s the vibe?"
                rows={3}
            />

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex gap-3">
                    <label htmlFor="startDate" className="font-medium">Start Date</label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                    />
                </div>

                <div className="flex gap-4">
                    <label htmlFor="endDate" className="font-medium">End Date</label>
                    <input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                    />
                </div>
            </div>

            <label htmlFor="isExact" className="flex flex-row items-center gap-4 ">
                <input
                    id="isExact"
                    type="checkbox"
                    checked={isExact}
                    onChange={() => setIsExact(!isExact)}
                />
                Dates are exact (uncheck if flexible)
            </label>

            {/* error handling above submit button */}
            {error && <p className="text-red-800">{error}</p>}

            {/* conditionally change button label */}
            <Button type="submit" shape="md" label={submitting ? "Creating..." : "Add New Trip"} className="bg-leaf w-fit self-center" />
        </form>
    )
}