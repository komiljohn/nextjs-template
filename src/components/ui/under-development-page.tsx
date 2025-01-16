import React from "react";

export default function UnderDevelopmentPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="container px-4 mx-auto text-3xl py-10 text-center h-[calc(100vh-73px)] flex items-center justify-center">
      {children}
    </div>
  );
}
