import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-[20px]">
      <div className="text-center max-w-[500px]">
        {/* Big 404 */}
        <h1 className="text-[120px] min-[810px]:text-[160px] font-bold text-white leading-[1em] tracking-[-5px] font-[family-name:var(--font-afacad-flux)] gradient-text-red-purple">
          404
        </h1>

        <h2 className="text-[24px] min-[810px]:text-[32px] font-bold text-white leading-[1.2em] tracking-[-1px] font-[family-name:var(--font-afacad-flux)] mt-[10px]">
          Page Not Found
        </h2>

        <p className="text-[15px] text-text-secondary leading-[24px] mt-[16px] font-[family-name:var(--font-dm-sans)]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="mt-[32px] flex items-center justify-center gap-[12px] flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-accent-purple text-white px-[20px] py-[10px] rounded-[10px] text-[16px] font-medium font-[family-name:var(--font-dm-sans)] hover:brightness-125 transition-all purple-glow"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Decorative glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full pointer-events-none -z-10"
          style={{ background: "radial-gradient(ellipse, rgba(79,26,214,0.15) 0%, transparent 70%)" }}
        />
      </div>
    </div>
  );
}
