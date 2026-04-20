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
        <div className="min-h-screen p-6 md:p-10 flex flex-col bg-linear-to-br from-leaf via-liteberry to-lav">
            <div className="p-8  rounded-2xl h-2/5 flex flex-col gap-4 justify-around">
                <h1 className="text-5xl md:text-8xl">WELCOME TO GOEASY</h1>
                <h3 className="text-4xl md:text-6xl">Design Your Trip Before You Spend a Dollar</h3>
                <p className="text-2xl">Curate activities in advance to avoid overpriced tourist traps and see your estimated spending update in real time.</p>
            </div>

            <Button shape="md" label="Signup Now!" className="bg-lav w-fit self-center mb-4" onClick={() => navigate("/signup")}/>

            <section  aria-label="pictures of people traveling">
                <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.5 }}}>
                    <img src="https://images.unsplash.com/photo-1685173864597-92247716fd59?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="woman biking in Lyon, France along the banks of the Saone river" className="rounded-3xl w-full md:w-[25vw] place-self-center"/>
                </motion.div>

            </section>
        </div>
    )
}