"use client";
import React from "react";
import { AuthProvider } from "./AuthProvider";

const Providers: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      {/* Add other providers as needed */}
      {children}
    </AuthProvider>
  );
};

export default Providers;
