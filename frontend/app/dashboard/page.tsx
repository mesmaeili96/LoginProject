"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [message, setMessage] = useState("Loading...");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5162/api/auth/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          localStorage.removeItem("token");
          router.replace("/login");
          return;
        }

        const data = await response.json();

        setMessage(data.message);
        setEmail(data.email);
      } catch (error) {
        console.error(error);
        setMessage("Cannot connect to backend.");
      }
    }

    loadProfile();
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("token");
    router.replace("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-lg">

        <h1 className="mb-6 text-3xl font-bold text-black">
          Dashboard
        </h1>

        <p className="font-semibold text-green-600">
          {message}
        </p>

        {email && (
          <p className="mt-4 text-black">
            Logged in as:
            <span className="ml-2 font-semibold text-green-600">
              {email}
            </span>
          </p>
        )}

        <button
          onClick={handleLogout}
          className="mt-6 w-full rounded-lg bg-red-600 p-3 font-semibold text-white hover:bg-red-700"
        >
          Logout
        </button>

      </div>
    </main>
  );
}