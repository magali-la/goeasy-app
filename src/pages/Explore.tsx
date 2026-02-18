import { Link } from "react-router";
import { motion } from "motion/react";

// city interface
interface City {
    id: string;
    name: string;
    imgUrl: string;
}

// set up the data to map and display on the cliclable cards
const citiesData: City[] = [
    { id: "nyc", name: "New York City", imgUrl: "https://images.unsplash.com/photo-1587161584760-f51779fb276a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "atlanta", name: "Atlanta", imgUrl: "https://images.unsplash.com/photo-1572978122938-4b7b95c292c4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "lyon", name: "Lyon", imgUrl: "https://images.unsplash.com/photo-1663151448743-9b5f00703eff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
]

export default function Explore() {   
    
    return (
        <div className="h-full p-10 flex flex-col gap-8">
            <h1>Explore Cities</h1>
            <h3>Curated budget travel activities, right at your fingertips!</h3>

            {/* template to map through thecities objct */}
            <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
                {citiesData.map((city) => (
                    // wrap the div in a link so it's clickable and set the route t the id which is the slug - use group to contrl the hover of children
                    <Link key={city.id} to={`/explore/${city.id}`} className="group">
                        <motion.div className="relative h-72 rounded-2xl overflow-hidden shadow-md" whileHover={{ scale: 1.05, transition: { duration: 0.5 }}}>
                            {/* image w grayscale */}
                            <img src={city.imgUrl} alt={city.name} className="h-full w-full object-cover transition duration-500 grayscale group-hover:grayscale-0"/>

                            {/* text */}
                            <div className="absolute bottom-5 left-5">
                                <h2 className="text-white text-2xl font-dela">{city.name}</h2>
                                <p className="text-white text-sm">View activities →</p>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    )
}