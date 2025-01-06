"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const user: User = session?.user as User;

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
    } finally {
      setLoading(false); // Ensure loading is reset even if signOut fails
    }
  };

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Check if the user has scrolled
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup listener
    };
  }, []);

  return (
    <nav
      className={`p-4 md:p-6 shadow-lg sticky top-0 z-10 transition-colors duration-300 ${
        isScrolled
          ? "bg-black/50 dark:bg-gray-800 backdrop-blur-md text-white"
          : "bg-transparent dark:bg-black text-white"
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <Link className="text-xl font-bold mb-4 md:mb-0" href="/">
          Mystery Message
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
            <Button className="w-full md:w-auto">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
