import { motion } from "motion/react"
import Button from "../components/Button"
import { useNavigate } from "react-router"
import { useEffect } from "react";
import { ping } from "../services/ping";

export default function Landing() {
    const navigate = useNavigate();

    useEffect(() => {
        // ping render
        ping();
    }, []);

    return (
        <div className="min-h-screen items-start p-6 sm:p-8 md:p-10 flex flex-col bg-linear-to-br from-leaf via-liteberry to-lav">
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
        </div>
    )
}