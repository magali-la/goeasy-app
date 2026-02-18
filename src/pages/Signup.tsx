import SignupForm from "../components/Auth/SignupForm.tsx";

export default function Signup() {

    return (
        <div className="relative min-h-full p-10">
            {/* decorative background div*/}
            <div className="h-1/2 bg-liteberry absolute"></div>
            <div className="flex flex-col md:flex-row justify-between gap-10">
                <div className="flex flex-col gap-8 md:gap-20">
                    <h1 className="font-dela">Your travels await you...</h1>
                    <img className="rounded-2xl shadow-lg shadow-liteberry" src="https://images.unsplash.com/photo-1627286763057-f223c52f3e1a?q=80&w=1417&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="friends walking on a busy, sunny pier with bikes and backpacks"/>
                </div>
                <SignupForm/>
            </div>
        </div>
    )
}