// Utility to ping render to avoid cold start on signup and login
import { axiosInstance } from "./axios";

export async function ping() {
    console.log("Pinging render...");

    try {
        const response = await axiosInstance.get("/api/awaken");
        console.log(response.data.message);
    } catch {
        console.log("Error pinging Render");
    }
}