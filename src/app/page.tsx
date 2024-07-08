"use client";
import Link from "next/link";
import React, { useState } from "react";

function Home() {
  const [showButtons, setShowButtons] = useState(false);

  function handleClickOnGetStarted(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    setShowButtons(true);
  }

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            This is a demonstration of simple Sign up and Sign in flows using
            React for the frontend and NestJS for the Backend.
          </p>
          {!showButtons ? (
            <button
              className="btn btn-primary"
              onClick={handleClickOnGetStarted}
            >
              Get Started
            </button>
          ) : (
            <div className="flex flex-col gap-4 items-center">
              <button className="btn btn-primary">
                <Link href="/sign-up">Sign Up</Link>
              </button>
              <button className="btn btn-secondary">
                <Link href="/sign-in">Sign In</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
