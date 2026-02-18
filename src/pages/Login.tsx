import LoginForm from "../components/Auth/LoginForm";

export default function Login() {
    return (
        <div className="relative min-h-full p-10">
            <div className="flex flex-col md:flex-row justify-between gap-10">
                <div className="flex flex-col gap-8 md:gap-20">
                    <h1 className="font-dela">Your travels await you...</h1>
                    <img className="rounded-2xl shadow-lg shadow-liteberry" src="https://images.unsplash.com/photo-1758599668652-291575a50dff?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="four friends with backpacks taking a selfie in the woods"/>
                </div>
                <LoginForm/>
            </div>
        </div>
    )
}