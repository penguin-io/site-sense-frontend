"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // State to store error messages
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          is_active: true,
          is_superuser: false,
          is_verified: false,
          username,
        }),
      });

      if (response.status === 201) {
        // Handle successful signup (201 Created)
        console.log("Signup successful!");
        router.push("/auth/login"); // Redirect to login page after signup
      } else if (response.status === 400) {
        // Handle user already exists error
        const errorData = await response.json();
        setError(errorData.detail || "An error occurred during signup.");
        console.error("Signup failed:", errorData);
      } else if (response.status === 422) {
        // Handle validation errors
        const errorData = await response.json();
        setError(errorData.detail[0].msg || "Validation error occurred.");
        console.error("Validation Error:", errorData);
      } else {
        // Handle other errors
        setError("An unexpected error occurred.");
        console.error("Unexpected error:", response.status);
      }
    } catch (err) {
      setError("Failed to connect to the server.");
      console.error("Fetch error:", err);
    }
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col space-y-4">
      {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2"
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
