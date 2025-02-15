"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append("username",email)
    formData.append("password",password)
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/auth/jwt/login`, {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      // Handle successful login
      const data = await response.json();
      console.log("Login successful!", data);
      // Store the access token (example: in localStorage)
      localStorage.setItem('access_token', data.access_token);
      router.push("/dashboard"); // Redirect to dashboard or home page after login
    } else {
      // Handle error
      const errorData = await response.json();
      console.error("Login failed:", errorData);
      // Display error message to the user (you'll need to add UI for this)
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col space-y-4">
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
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
