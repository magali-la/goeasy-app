import { motion } from "motion/react"
import Button from "../components/Button"
import { useNavigate } from "react-router"
import { useEffect } from "react";
import { ping } from "../services/ping";

// feature type
interface Feature {
    id: string;
    icon: string;
    title: string;
    subtitle: string;
}

// features array for cards
const features: Feature[] = [
    { id: "gems", icon: "bi bi-map", title: "Explore Local Gems", subtitle: "Ditch the generic, overhyped tourist traps. Uncover curated local spots and hidden gems, then build a custom itinerary that actually fits your vibe." },
    { id: "budget", icon: "bi bi-wallet2", title: "Budget in Real Time", subtitle: "Track your spending while you dream of your next adventure. Watch your estimated spending update instantly with every activity you add to your trip." },
    { id: "travel", icon: "bi bi-backpack2", title: "Travel Stress-Free", subtitle: "Lock in your complete game plan and final price tag before booking a single flight. Know exactly where you’re going and what it costs before you leave." }
];

export default function Landing() {
    const navigate = useNavigate();

    useEffect(() => {
        // ping render
        ping();
    }, []);

    return (
        <div className="min-h-screen items-start p-6 sm:p-8 md:p-10 flex flex-col gap-10 bg-linear-to-br from-leaf via-liteberry to-lav">
            {/* hero section */}
            <section className="flex flex-col md:flex-row md:gap-10 justify-between h-fit" aria-labelledby="hero-heading">
                <div className="md:basis-1/2 lg:basis-3/5 rounded-2xl flex flex-col gap-6 md:gap-10 justify-center">
                    <h1 id="hero-heading" className="text-4xl md:text-7xl">Design Your Trip <br /> <span className="text-mustard">Before You Spend a Dollar</span></h1>
                    <p className="text-xl md:text-2xl">Curate budget-friendly activities in advance with GoEasy to avoid overpriced tourist traps and see your estimated spending update in real time!</p>            
                    <Button shape="md" label="Signup Now!" className="bg-lav w-fit self-center mb-6" onClick={() => navigate("/signup")}/>
                </div>

                <div className="md:basis-1/2 lg:basis-2/5 flex items-center justify-center">
                    <motion.img 
                        whileHover={{ scale: 0.98, transition: { duration: 0.4 }}} 
                        src="https://images.unsplash.com/photo-1650366215170-3f45bea0d8e5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="woman with vibrant orange sweater and backpack crossing a vibrant new york city street" className="rounded-3xl object-cover max-h-100 md:max-h-140 aspect-square md:aspect-auto"
                    />
                </div>
            </section>
            {/* features section */}
            <section aria-labelledby="features-header" className="flex flex-col gap-10">
                <h2 id="features-header" className="text-3xl text-center">How It Works</h2>
                {/* grid with features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 lg:gap-10">
                    {/* feature cards mapped */}
                    {features.map(({ id, icon, title, subtitle }) => (
                        <div key={id} className="flex flex-col gap-4 items-center p-4">
                            <i className={`${icon} text-6xl text-mustard text-shadow-2xs text-shadow-lav`}></i>
                            <h3 className="font-dela text-xl">{title}</h3>
                            <p className="text-lg text-balance">{subtitle}</p>
                            
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}