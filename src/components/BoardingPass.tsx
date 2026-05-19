import { useNavigate } from "react-router";
import type { Trip } from "../types";
import Button from "./Button";
import TripStatusTag from "./TripStatusTag";

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
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 sm:justify-between px-4 py-3 bg-berry text-cream">
            <h3 className="font-dela font-medium text-lg self-start sm:self-auto">{trip.title}</h3>

            <Button shape="xs" label="View Trip" className="bg-liteberry text-berry shrink-0 self-end sm:self-auto" onClick={() => navigate(`/trips/${trip._id}`)} />
        </div>

        {/* main section */}
        <div className="grid grid-cols-1 md:grid-cols-3">
            {/* left part */}
            <div className="md:col-span-2 p-4">
                {/* info div */}
                <div className="flex flex-col-reverse sm:flex-row items-start justify-between gap-3">
                    {/* details */}
                    <div className="space-y-4">
                        {/* city */}
                        <p className="boarding-text">
                            <span className="boarding-icon">
                                <i className="bi bi-geo-fill"></i>
                            </span>
                            <span>{cityLabel[trip.city]}</span>
                        </p>
                        {/* dates */}
                        <p className="boarding-text">
                            <span className="boarding-icon">
                                <i className="bi bi-calendar-week"></i>
                            </span>
                            <span>
                                {new Date(trip.startDate).toLocaleDateString()} – {new Date(trip.endDate).toLocaleDateString()}
                            </span>
                        </p>
                        {/* activities */}
                        <p className="boarding-text">
                            <span className="boarding-icon">
                                <i className="bi bi-emoji-sunglasses"></i>
                            </span>
                            <span>{activitiesPlanned} Activit{activitiesPlanned !== 1 ? 'ies' : 'y'}</span>
                        </p>
                        {/* travelers */}
                        <p className="boarding-text">
                            <span className="boarding-icon">
                                <i className="bi bi-person-vcard"></i>
                            </span>
                            <span>{travelers} Traveler{travelers !== 1 ? 's' : ''}</span>
                        </p>
                    </div>

                    {/* status tag */}
                    <TripStatusTag status={trip.status} />
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