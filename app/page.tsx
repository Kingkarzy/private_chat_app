"use client";

import { useState, useEffect, ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error("Caught an error:", event.error);
      setHasError(true);
    };
    
    const promiseRejectionHandler = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
      setHasError(true);
    };
    
    window.addEventListener("error", errorHandler);
    window.addEventListener("unhandledrejection", promiseRejectionHandler);
    
    return () => {
      window.removeEventListener("error", errorHandler);
      window.removeEventListener("unhandledrejection", promiseRejectionHandler);
    };
  }, []);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
        <h1 className="text-4xl font-bold">Something went wrong!</h1>
        <p className="text-lg">Please try refreshing the page.</p>
      </div>
    );
  }

  return <>{children}</>;
}

export default function Home() {
  const handleClick = () => {
    window.location.href = "/home";
  };

  return (
    <ErrorBoundary>
      <div className="font-mono flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="flex flex-col w-1/2 h-1/2 items-center gap-y-10">
          <div className="flex justify-center items-center gap-x-3">
            <h1 className="text-5xl font-bold text-center">Private </h1>
            <div className="w-[120px] h-[120px] rounded-full">
              <div className="w-full h-full customBg1 scale-125"></div>
            </div>
            <h1 className="text-5xl font-bold text-center"> App</h1>
          </div>

          <button className="py-3 px-6 text-xl bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:scale-105" onClick={handleClick}>
            Start Chatting
          </button>
          <p className="text-3xl font-bold text-white bg-gray-600 bg-white/30 backdrop-blur-none py-2 px-6 rounded-full">
            Developed by Chukwuma Joseph Kama
          </p>
        </div>
      </div>
    </ErrorBoundary>
  );
}
