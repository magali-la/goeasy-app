import { useState } from "react";
import { axiosInstance } from "../services/axios";
import type { Trip, TripStatus } from "../types";
import Button from "./Button";
import { useNavigate } from "react-router";

interface TripEditFormProps {
    tripId: string;
    trip: Trip;
    onEditedTrip: () => void;
}

export default function TripEditForm({ tripId, trip, onEditedTrip }: TripEditFormProps) {
    // hooks
    const navigate = useNavigate();
    
    // state for editing trip
    const [title, setTitle] = useState(trip.title);
    const [description, setDescription] = useState(trip.description);
    // date string needs to be sliced to fit with YYYY-MM-DD format the input is expecting
    const [startDate, setStartDate] = useState(trip.startDate.slice(0, 10));
    const [endDate, setEndDate] = useState(trip.endDate.slice(0, 10));
    const [status, setStatus] = useState<TripStatus>(trip.status);
    const [saving, setSaving] = useState(false);
    const [editError, setEditError] = useState("");

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

            // callback to parent, refetch the trip after edits are made
            onEditedTrip();

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

    return (
        <form onSubmit={handleSave} className="rounded-2xl bg-litemustard p-6 flex flex-col gap-4">
            <label htmlFor="tripName" className="font-medium">Trip Name</label>
            <input id="tripName" type="text" value={title} onChange={(event) => setTitle(event.target.value)} />

            <label htmlFor="tripDesc" className="font-medium">Description</label>
            <textarea id="tripDesc" value={description} onChange={(event) => setDescription(event.target.value)} rows={3} />

            <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-3 items-center">
                <label htmlFor="startDate" className="font-medium">Start Date</label>
                <input id="startDate" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
            </div>

            <div className="flex gap-3 items-center">
                <label htmlFor="endDate" className="font-medium">End Date</label>
                <input id="endDate" type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
            </div>
            </div>

            <label htmlFor="tripStatus" className="font-medium">Status</label>
            <select id="tripStatus" value={status} onChange={(event) => setStatus(event.target.value as TripStatus)}>
                <option value="planning">Planning</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="archived">Archived</option>
            </select>

            {/* TODO: more granular errors and form validation */}
            {editError && <p className="text-red-800">{editError}</p>}

            <Button type="submit" shape="sm" label={saving ? "Saving..." : "Save Changes"} className="bg-leaf w-fit self-center"
            />
            <Button type="button" shape="xs" label="Delete Trip" className="bg-red-400 font-normal w-fit self-center" onClick={handleDeleteTrip}
            />
        </form>
    )
}