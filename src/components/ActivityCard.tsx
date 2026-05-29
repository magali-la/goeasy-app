import { motion } from "motion/react";
import type { Activity } from "../types";
import Button from "./Button";

// prop types
interface ActivityCardProps {
    activity: Activity;
    cityId: string
    type: "explore" | "trip";
    onActivityAction: (activityId: string) => void;
}

export default function ActivityCard({ activity, cityId, onActivityAction }: ActivityCardProps) {

    return (
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

                {/* button to add/ delete activity */}
                <Button shape="sm" label="Add to Trip" className="bg-leaf mt-2 self-center" onClick={() => onActivityAction(activity._id)}/>
            </div>
        </motion.div>
    )

}