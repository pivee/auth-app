import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome!</h1>
          <p className="py-6">
            You have signed in to the application successfully.
          </p>
          <button className="btn btn-ghost">
            <Link href="/">Sign out</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
