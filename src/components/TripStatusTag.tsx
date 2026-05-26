import type { TripStatus } from "../types";

type TripStatusTagProps = {
    status: TripStatus;
};

const statusVariants = {
    planning: { color: 'bg-mustard', icon: 'bi bi-journal-richtext' },
    upcoming: { color: 'bg-sea', icon: 'bi bi-airplane-engines' },
    ongoing: { color: 'bg-leaf', icon: 'bi bi-backpack2' },
    archived: { color: 'bg-stone', icon: 'bi bi-archive' }
};

export default function TripStatusTag({ status }: TripStatusTagProps) {
    // fallback if status fails
    const stat = status || "planning";
    const { color, icon } = statusVariants[stat];

    return (
        <span className={`flex flex-row items-center justify-between rounded-lg gap-2.5 py-1.5 px-4 border-2 border-black/10 w-fit ${color}`}>
            <i className={icon}></i>
            <p className="capitalize">{stat}</p>
        </span>
    )
};