"use client";

import React from "react";
import SignupForm from "./components/signup-form";
import Link from "next/link";

const SignupPage: React.FC = () => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="text-sm text-muted-foreground">Create your account.</p>
      </div>
      <SignupForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
