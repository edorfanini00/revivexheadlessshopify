export default function BiomarkersSection() {
  return (
    <div className="relative bg-white pt-20 sm:pt-28">
      <div className="relative w-full overflow-hidden rounded-none sm:rounded-[10px]" style={{ minHeight: "90vh" }}>
        {/* Full-bleed background image */}
        <img
          src="/images/biomarkers-hero.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-6 lg:px-10 flex items-start justify-end" style={{ minHeight: "90vh" }}>
          <div className="pt-32 sm:pt-40 text-right max-w-[500px]">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/35 mb-4">Testing</p>
            <h2 className="text-[28px] sm:text-[40px] lg:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] text-white mb-5">
              Every Revivex journey starts<br />with 100+ biomarkers
            </h2>
            <p className="text-[13px] sm:text-[14px] text-white/50 leading-[1.75] ml-auto max-w-[400px]">
              A full-body test with a quick 10-min lab draw. Understand your hormones, metabolic markers, nutrients, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
