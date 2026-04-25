import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext"
import Button from "./Button";
import { motion } from "motion/react";

export default function NavBar() {
    // use this to determine navbar
    const { isAuthenticated, logout, isCheckingAuth } = useAuth();
    // useNav for buttns
    const navigate = useNavigate();

    // logout function - mke it async to wait for the resolve before navigating
    async function handleLogout() {
        await logout();
        navigate("/")
    }

    return (
        <nav className="flex flex-col md:flex-row items-center md:justify-between bg-pink-100/90 backdrop-blur-lg px-20 py-1 gap-3 sticky top-0 z-50" role="navigation">
            {/* title section */}
            <NavLink to="/">
                <img id="logo" src="/logohoriz.svg" alt="logo illustration of backpack in colors teal, green, and orange with GoEasy name to the right"></img>
            </NavLink>
            {/* conditional nav links section */}
            <section aria-label="Nav links">
                {/* need to avoid flicker while it's checking auth state so don't render the nav links until the check has resolved, then fade in the right nav version */}
                {!isCheckingAuth && (
                    <motion.div
                        initial={{ opacity: 0, y: -5}}
                        animate={{ opacity: 1, y: 0}}
                        transition={{ duration: 0.4, ease: "easeOut"}}
                    >
                        {isAuthenticated ? (
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 md:gap-10">
                                <ul className="flex flex-row gap-3 md:gap-6">
                                    <NavLink to="/home" className="text-xl hover:underline hover:text-mustard transition-all duration-250">Home</NavLink>
                                    <NavLink to="/trips" className="text-xl hover:underline hover:text-mustard transition-all duration-250">Trips</NavLink>
                                    <NavLink to="/explore" className="text-xl hover:underline hover:text-mustard transition-all duration-250">Explore</NavLink>
                                </ul>
                                <Button shape="sm" className='bg-mustard' label="Logout" onClick={handleLogout}/>
                            </div>
                        ) : (
                            <div className="flex flex-col md:flex-row items-center justify-evenly gap-2 md:gap-10">
                                <NavLink to="/" className="text-xl hover:underline hover:text-mustard transition-all duration-250">Home</NavLink>
                                <section className="flex flex-row gap-10" aria-label="signup and login buttons">
                                    <Button shape='sm' className='bg-litemustard' label='Signup' onClick={() => navigate("/signup")}/>
                                    <Button shape='sm' className='bg-mustard' label='Login' onClick={() => navigate("/login")}/>
                                </section>
                            </div>
                        )}
                    </motion.div>
                )}
            </section>
        </nav>
    )
}