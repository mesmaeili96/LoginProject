"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("You are not logged in.");
        setAuthorized(false);
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
          setMessage("Unauthorized.");
          setAuthorized(false);
          return;
        }

        const data = await response.json();

        setMessage(data.message);
        setEmail(data.email);
        setAuthorized(true);

      } catch (error) {
        console.error(error);

        setMessage("Cannot connect to backend.");
        setAuthorized(false);
      }
    }

    loadProfile();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-lg">

        <h1 className="mb-6 text-3xl font-bold text-black">
          Dashboard
        </h1>

        <p
          className={`font-semibold ${
            authorized ? "text-green-600" : "text-red-600"
          }`}
        >
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

      </div>
    </main>
  );
}