export default function ProjectLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col relative overflow-hidden animate-pulse">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20 relative z-10 flex flex-col gap-10">
        {/* Top Back Navigation Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-9 w-32 bg-zinc-800/60 rounded-xl" />
          <div className="h-9 w-24 bg-zinc-800/40 rounded-xl" />
        </div>

        {/* Header Skeleton */}
        <div className="flex flex-col gap-4">
          <div className="h-5 w-40 bg-sky-500/20 rounded-md" />
          <div className="h-12 w-3/4 sm:w-2/3 bg-zinc-800/70 rounded-2xl" />
          <div className="h-6 w-full max-w-2xl bg-zinc-800/40 rounded-lg" />
        </div>

        {/* Hero Banner / Gallery Skeleton */}
        <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl bg-zinc-900/80 border border-zinc-800/80 shadow-2xl" />

        {/* Info Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="h-24 rounded-2xl bg-zinc-900/60 border border-zinc-800/60" />
          <div className="h-24 rounded-2xl bg-zinc-900/60 border border-zinc-800/60" />
          <div className="h-24 rounded-2xl bg-zinc-900/60 border border-zinc-800/60" />
          <div className="h-24 rounded-2xl bg-zinc-900/60 border border-zinc-800/60" />
        </div>

        {/* Content Paragraph Skeletons */}
        <div className="flex flex-col gap-3 pt-6">
          <div className="h-4 w-full bg-zinc-800/40 rounded" />
          <div className="h-4 w-5/6 bg-zinc-800/30 rounded" />
          <div className="h-4 w-4/6 bg-zinc-800/30 rounded" />
        </div>
      </main>
    </div>
  );
}

