import HowItWorks from "@/components/HowItWorks";

export const metadata = {
  title: "Start with Testing | Revivex",
  description: "Understand exactly what your body needs. Your biology, decoded.",
};

export default function TestingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative w-full" style={{ minHeight: "420px" }}>
        <img
          src="https://ik.imagekit.io/kusosheutk/hf_20260508_021901_7a55cf6e-3e5e-47de-9984-19b66ba4a807.jpg"
          alt="Start with Testing"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-6 lg:px-10 pb-10 pt-28">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase text-white/50 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Coming Soon
            </span>
            <h1 className="text-[38px] sm:text-[52px] font-medium leading-[1.05] tracking-[-0.03em] text-white">
              Start with<br />Testing
            </h1>
            <p className="mt-4 text-[14px] text-white/50 leading-[1.7] max-w-[380px]">
              Understand exactly what your body needs. Your biology, decoded.
            </p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <HowItWorks defaultPath="testing" />
    </div>
  );
}
