import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext"
import Button from "./Button";

export default function NavBar() {
    // use this to determine navbar
    const { isAuthenticated } = useAuth();
    // useNav for buttns
    const navigate = useNavigate();

    return (
        <nav className="flex flex-col md:flex-row items-center md:justify-between bg-pink-100 px-20 py-2 gap-3 sticky top-0" role="navigation">
            {/* title section */}
            <NavLink to="/">
                <img id="logo" src="/logohoriz.svg" alt="logo illustration of backpack in colors teal, green, and orange with GoEasy name to the right"></img>
            </NavLink>
            {/* conditional nav links section */}
            <section aria-label="Nav links">
                {isAuthenticated ? (
                    <div className="flex flex-row justify-between">
                        <ul>
                            <NavLink to="/home">Home</NavLink>
                            <NavLink to="/trips">Trips</NavLink>
                            I'm an authenticated nav link
                        </ul>
                        <button className="bg-orange-500 px-4 py-2 rounded-full">logout</button>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row items-center justify-evenly gap-2 md:gap-10">
                        <NavLink to="/" className="text-2xl hover:underline hover:text-mustard transition-all duration-250">Home</NavLink>
                        <section className="flex flex-row gap-10" aria-label="signup and login buttons">
                            <Button shape='md' className='bg-litemustard' label='Signup' onClick={() => navigate("/signup")}/>
                            <Button shape='md' className='bg-mustard' label='Login' onClick={() => navigate("/login")}/>
                        </section>
                    </div>
                )}
            </section>
        </nav>
    )
}