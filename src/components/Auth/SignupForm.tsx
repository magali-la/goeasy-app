import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../services/axios";
import Button from "../Button";
import { ping } from "../../services/ping";

export default function SignupForm() {
    // controlled inputs
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    // set an error state to show validation messages
    const [error, setError] = useState<string>("");
    // state for toggling the password in view
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // hooks
    const { login } = useAuth();
    const navigate = useNavigate();

    // use effect to ping render
    useEffect(() => {
        // ping render
        ping();
    }, []);

    // submit form handler
    async function handleSignup(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        // form validation logic
        if (!username || !email || !password) {
            setError("Please fill out all required fields.");
            // return it to show the error below the form
            return;
        }

        // email errors - regex from backend
        const emailRegex = /.+@.+\..+/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email.");
            return;
        }

        // passwrd errrs - regex from backend
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 8 characters and include at least 1 letter and 1 number.");
            return;
        }

        // try catch with axios, then call login function from auth provider
        try {
            // TO DELETE set testInput prior to form creation - check when messing up the password and email
            const newUser = {
                username,
                email,
                password
            }

            // axios call for the route
            const res = await axiosInstance.post('/api/users/signup', newUser)

            // call login to store the user
            login(res.data.user);

            // if successful go to /home which is the dashboard for authenicated user
            navigate("/home");

        } catch (error: any) {
            if (error.response) {
                // message with the error status & message sent from the backend
                console.log(error.response.status, error.response.data.message);
            } else {
                // generic error if not
                console.error("Signup failed", error);
            } 
        }
    }

    async function handleGoogleSignup() {
        try {
            // this will follow the redirect initiated in the OAuth flow - backend will manage redirecting to home
            window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL;
        } catch (error: any) {
            if (error.response) {
                // message with the error status & message sent from the backend
                console.log(error.response.status, error.response.data.message);
            } else {
                // generic error if not
                console.error("Google Signup failed", error);
            } 
        } 
    }

    return (
        // remove browser tooltips for form validation
        <form className="rounded-2xl bg-white h-1/2 p-8 flex flex-col gap-4 min-w-1/2 justify-center items-center" aria-label="signup for an account" onSubmit={handleSignup} noValidate>
            <h2 className="font-dela self-start">Create an Account</h2>

            {/* google button */}
            <button type="button" className="py-2 px-5 cursor-pointer shadow-2xs hover:shadow-md rounded-lg border-dark/15 border-2" onClick={handleGoogleSignup}><i className="bi bi-google mr-2"></i>Sign up with Google</button>

            <p className="font-medium text-lg">Or signup with email</p>

            {/* form elements */}
            {/* username input */}
            <label htmlFor="username" className="font-medium text-lg self-start">Username</label>
            <small className="self-start">Username must be 6-15 characters</small>
            <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter username"/>

            {/* email input */}
            <label htmlFor="email" className="font-medium text-lg self-start">Email</label>
            <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter email"/>

            {/* password input */}
            <label htmlFor="password" className="font-medium text-lg self-start">Password</label>
            <small className="self-start">Password must be at least 8 characters and contain 1 number and 1 letter</small>
            
            {/* wrap in continer for the toggle button */}
            <div className="relative w-full">
                {/* change the input type if the showPassword is on or not */}
                <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password"/>
                {/* toggle button */}
                <button type="button" className="absolute right-3 top-1.5 text-2xl" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                        <i className="bi bi-eye-slash-fill"></i>
                    ): (
                        <i className="bi bi-eye-fill"></i>
                    )}
                </button>
            </div>
            
            <p>Already have an account? <span className="text-berry"><Link to="/login">Login here.</Link></span></p>

            {/* show the error above the submit button conditionally */}
            {error && (
                <p className="text-red-800">{error}</p>
            )}
            {/* submit button */}
            <Button type="submit" shape="auth" label="Sign Up" className="bg-berry"/>
        </form>
    )
}