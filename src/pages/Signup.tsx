import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext"
import { axiosInstance } from "../services/axios.ts";

export default function Signup() {
    // import login function to store the token and update auth state in memory
    const { login } = useAuth();
    const navigate = useNavigate()

    async function handleSignup() {
        // try catch with axios, then call login function from auth provider
        try {
            // TO DELETE set testInput prior to form creation - check when messing up the password and email
            const testInput = {
                username: 'testingfrontend',
                email: 'testingfrontendgmail.com',
                password: 'testfrontend1'
            }

            // axios call for the route
            const res = await axiosInstance.post('/api/users/register', testInput)

            // call login to store the token
            login(res.data.token, res.data.user);

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

    return (
        <>
            <h1>Signup Page</h1>
            <button className="bg-blue-500 text-white cursor-pointer" onClick={handleSignup}>Click me to sign up</button>
        </>
    )
}