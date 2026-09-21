"use client";

import { useEffect, useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const blockedUntil = localStorage.getItem("blockedUntil");

    if (!blockedUntil) {
      return;
    }

    const blockedTime = new Date(blockedUntil).getTime();

    if (blockedTime > Date.now()) {
      router.replace("/blocked");
      return;
    }

    localStorage.removeItem("blockedUntil");
  }, [router]);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
    setIsSuccess(false);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5162/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      // User is blocked
      if (response.status === 429) {
        if (data.blockedUntil) {
          localStorage.setItem(
            "blockedUntil",
            data.blockedUntil
          );
        }

        router.replace("/blocked");
        return;
      }

      // Wrong email/password
      if (!response.ok) {
        setMessage(
          data.message || "Invalid email or password."
        );

        setIsSuccess(false);
        return;
      }

      // Successful login
      localStorage.setItem("token", data.token);
      localStorage.removeItem("blockedUntil");

      setMessage(
        data.message || "Login successful."
      );

      setIsSuccess(true);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);

      setMessage(
        "Cannot connect to the server."
      );

      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_#dce7ff_0%,_#a8bdf2_32%,_#748bd3_62%,_#ead8d2_100%)]">

      {/* Background overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10" />

      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-white/20 blur-3xl" />

      <div className="absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-orange-100/30 blur-3xl" />

      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_1.1fr_1fr]">

        {/* LEFT SIDE */}
        <section className="hidden px-12 py-10 lg:flex lg:flex-col lg:justify-between">

          {/* Brand */}
          <div className="flex items-center gap-3 text-white">

            <div className="rounded-xl border border-white/20 bg-white/10 p-2 backdrop-blur">
              <Sparkles className="h-6 w-6" />
            </div>

            <span className="text-3xl font-semibold tracking-[0.12em]">
              UNFXCO
            </span>

          </div>

          {/* Main slogan */}
          <div className="max-w-sm text-white">

            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/60">
              Create without limits
            </p>

            <h2 className="text-6xl font-light leading-[1.05] tracking-tight">
              One
              <br />
              brand
              <br />
              infinite
              <br />
              possibilities
            </h2>

            <div className="mt-8 h-px w-16 bg-white/50" />

            <p className="mt-7 max-w-xs text-lg leading-8 text-white/75">
              A modern space built for ideas,
              creativity and meaningful progress.
            </p>

          </div>

          <div className="text-sm tracking-[0.18em] text-white/60">
            CREATE &nbsp; • &nbsp; BUILD &nbsp; • &nbsp; GROW
          </div>

        </section>


        {/* LOGIN AREA */}
        <section className="flex items-center justify-center px-5 py-10">

          <div className="w-full max-w-[520px] rounded-[32px] border border-white/60 bg-white/85 p-7 shadow-[0_30px_80px_rgba(15,23,42,0.25)] backdrop-blur-xl sm:p-10">

            {/* Mobile brand */}
            <div className="mb-8 flex flex-col items-center text-center">

              <div className="mb-5 flex items-center gap-3 text-[#16266e]">

                <div className="rounded-xl bg-blue-50 p-2">
                  <Sparkles className="h-7 w-7 text-blue-600" />
                </div>

                <span className="text-2xl font-bold tracking-[0.15em]">
                  UNFXCO
                </span>

              </div>

              <h1 className="text-4xl font-bold tracking-tight text-[#101c54] sm:text-5xl">
                Welcome Back
              </h1>

              <p className="mt-4 max-w-sm text-base leading-7 text-slate-600">
                Sign in to continue exploring infinite possibilities.
              </p>

            </div>


            <form onSubmit={handleSubmit}>

              {/* EMAIL */}
              <div className="mb-5">

                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Email
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

                  <Mail className="h-5 w-5 shrink-0 text-slate-500" />

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="w-full bg-transparent text-base text-black outline-none placeholder:text-slate-400"
                    required
                  />

                </div>

              </div>


              {/* PASSWORD */}
              <div className="mb-7">

                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Password
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

                  <LockKeyhole className="h-5 w-5 shrink-0 text-slate-500" />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className="w-full bg-transparent text-base text-black outline-none placeholder:text-slate-400"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current
                      )
                    }
                    className="rounded-lg p-1 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}

                  </button>

                </div>

              </div>


              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#253fae] via-[#3455dc] to-[#4c6cff] px-6 py-4 font-semibold tracking-[0.18em] text-white shadow-lg shadow-blue-500/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >

                {isLoading
                  ? "LOGGING IN..."
                  : "LOGIN"}

                {!isLoading && (
                  <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                )}

              </button>


              {/* STATUS MESSAGE */}
              {message && (
                <div
                  className={`mt-5 rounded-xl px-4 py-3 text-center text-sm font-semibold ${
                    isSuccess
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {message}
                </div>
              )}

            </form>

          </div>

        </section>


        {/* RIGHT SIDE */}
        <section className="hidden px-10 py-10 lg:flex lg:flex-col lg:justify-between">

          <div className="text-right text-xs uppercase tracking-[0.45em] text-white/65">
            One brand. Infinite possibilities.
          </div>

          <div className="flex justify-center">

            <div className="-rotate-6 text-right text-5xl font-light italic leading-[1.25] text-[#354889]/75">
              Think
              <br />
              Create
              <br />
              Beyond
            </div>

          </div>

          <div className="self-end rounded-3xl border border-white/20 bg-white/10 px-6 py-4 text-right text-sm leading-7 text-white/75 backdrop-blur-md">
            Ideas &nbsp; • &nbsp; Technology
            <br />
            Endless opportunities.
          </div>

        </section>

      </div>

    </main>
  );
}