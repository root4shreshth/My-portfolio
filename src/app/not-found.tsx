import Link from "next/link";
import LensSVG from "@/components/optic/LensSVG";

export default function NotFound() {
  return (
    <main className="shell flex min-h-[100svh] flex-col">
      <div className="t-mono flex h-16 items-center justify-between border-b border-line text-fg-3">
        <span>Shreshth Srivastava</span>
        <span>Error 404</span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-10 py-16 text-center">
        <LensSVG lit={12} className="w-[min(44vw,220px)] opacity-80" />
        <h1 className="t-display">
          Signal <span className="t-serif text-fg-2">lost.</span>
        </h1>
        <p className="max-w-[38ch] text-fg-2">The page you were looking for isn&apos;t in range. Recalibrate from the start.</p>
        <Link href="/" className="btn btn-solid">
          Return to sensor
        </Link>
      </div>
    </main>
  );
}
