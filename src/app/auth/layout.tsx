import React, { ReactNode } from "react";

interface LayoutProps {
  readonly children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main>
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-3xl ">SiteSense by Penguin.io</div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">       
              <p className="text-lg">
                Cutting-edge, AI-powered attendance tracking solutions.
              </p>
              {/* <footer className="text-sm">Sofia Davis</footer> */}
            </blockquote>
          </div>
        </div>
        <div className="flex h-full lg:p-8">{children}</div>
      </div>
    </main>
  );
}
