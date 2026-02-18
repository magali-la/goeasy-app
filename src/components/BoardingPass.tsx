import { useNavigate } from "react-router";
import type { Trip } from "../types";
import Button from "./Button";

type BoardingPassProps = {
    trip: Trip;
    // for projected spending numbers
    planned?: number;
};

// convert to readable format
const cityLabel: Record<Trip["city"], string> = {
    nyc: "New York City",
    atlanta: "Atlanta",
    lyon: "Lyon",
};

export default function BoardingPass({ trip, planned }: BoardingPassProps) {
    // to get to the right trip on view trip
    const navigate = useNavigate();

    // use optional chaining just in case something goes wrong
    const travelers = trip.participants?.length || 0;
    const activitiesPlanned = trip.activities?.length || 0;

  return (
    <div className="w-full rounded-4xl overflow-hidden shadow-sm bg-pink-100">
        {/* top bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-berry text-white">
            <h3 className="font-dela font-medium">{trip.title}</h3>

            <Button shape="sm" label="View Trip" className="bg-liteberry text-berry" onClick={() => navigate(`/trips/${trip._id}`)} />
        </div>

        {/* main section */}
        <div className="grid grid-cols-1 md:grid-cols-3">
            {/* left part */}
            <div className="md:col-span-2 p-4">
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-2 text-sm">
                    <p className="flex gap-3">
                        <span className="opacity-70 w-20">City</span>
                        <span className="font-medium">{cityLabel[trip.city]}</span>
                    </p>

                    <p className="flex gap-3">
                        <span className="opacity-70 w-20">Dates</span>
                        <span className="font-medium">
                        {new Date(trip.startDate).toLocaleDateString()} –{" "}
                        {new Date(trip.endDate).toLocaleDateString()}
                        </span>
                    </p>

                    <p className="flex gap-3">
                        <span className="opacity-70 w-20">Activities</span>
                        <span className="font-medium">{activitiesPlanned}</span>
                    </p>

                    <p className="flex gap-3">
                        <span className="opacity-70 w-20">Travelers</span>
                        <span className="font-medium">{travelers}</span>
                    </p>
                </div>

                {/* status pill */}
                <span className="text-sm px-3 py-1 rounded-full bg-bluegreen text-green-900">{trip.status}</span>
            </div>
        </div>

        {/* right part -spending */}
        <div className="p-4 border-t-3 md:border-t-0 md:border-l-3 border-dashed border-pink-300 bg-pink-50">
            <p className="text-md font-semibold mb-2">Spending</p>

            {planned && planned > 0 ? (
                <p>
                    <span className="opacity-70">Projected:</span>{" "}
                    <span className="font-medium">${planned}</span>
                </p>
            ) : (
                <p className="opacity-70">Add activities to estimate cost</p>
            )
            }
          </div>
        </div>
    </div>
  );
}