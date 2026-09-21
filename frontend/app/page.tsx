export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_#dce7ff_0%,_#a8bdf2_32%,_#748bd3_62%,_#ead8d2_100%)] px-6 py-10 text-slate-900">
      <div className="w-full max-w-3xl rounded-[32px] border border-white/60 bg-white/80 p-10 shadow-[0_30px_80px_rgba(15,23,42,0.25)] backdrop-blur-xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-blue-700">
          UNFXCO
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Welcome to the secure portal
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          This app includes a secure login flow, JWT-based profile access,
          and temporary account blocking after repeated failed attempts.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/login"
            className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Go to login
          </a>
          <a
            href="/dashboard"
            className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}
