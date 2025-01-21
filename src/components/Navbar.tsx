"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import GradientText from "./GradientText";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const user: User = session?.user as User;

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <nav className="p-4 md:p-6 border-b border-gray-800 shadow-lg sticky top-0 z-10 bg-white/5 backdrop-blur-md text-white">
        <div className="container mx-auto flex justify-between  items-center">
          <Link className="text-2xl" href="/">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
            >
              <p className="font-bold text-xl sm:text-3xl">SUGGESTION BOX</p>
            </GradientText>
          </Link>
          <div className="text-sm text-gray-600 dark:text-gray-300 ">
            Loading...
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="p-4 md:p-6 border-b border-gray-800 shadow-lg sticky top-0 z-10 bg-white/5 backdrop-blur-md text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link className="text-2xl" href="/">
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
          >
            <p className="font-bold text-xl sm:text-3xl">SUGGESTION BOX</p>
          </GradientText>
        </Link>

        {/* Conditional Rendering Based on Session */}
        {session ? (
          <div className="flex items-center">
            <span className="mr-4 text-sm text-gray-600 dark:text-gray-300">
              {user?.username || user?.email}
            </span>
            <Button
              className="w-full md:w-auto"
              onClick={handleSignOut}
              disabled={loading}
            >
              {loading ? "Logging out..." : "Log Out"}
            </Button>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 md:w-auto">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
