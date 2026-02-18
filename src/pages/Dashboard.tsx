import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import type { User } from "../types";
import { axiosInstance } from "../services/axios";

export default function Dashboard() {
    const { isAuthenticated, currentUser } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [profileUser, setProfileUser] = useState<User | null>(null);

     useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axiosInstance.get("/api/users/me");
        setProfileUser(res.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated]);

  if (loading) return <div>Loading user...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profileUser) return <div>No user data</div>;

    return (
        <>
            <h1>Dashboard - Authenticated User Page</h1>
            <h2>Profile fetch test</h2>
            <p>Username: {profileUser.username}</p>
            <p>User ID: {profileUser._id}</p>
            <p>Email: {profileUser.email}</p>
            <p>Profile created at: {profileUser.createdAt}</p>
        </>
    )
}