"use client";
import { useAuth } from "@/providers/AuthProvider";
import { signOut } from "@/services/authService";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) router.push("/sign-in");

  function handleSignOut() {
    signOut();
    router.push("/sign-in");
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome!</h1>
          <p className="py-6">
            You have signed in to the application successfully.
          </p>
          <button className="btn btn-ghost" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
