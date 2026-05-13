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
        {/* Dark scrim for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-6 lg:px-10 flex items-start justify-end" style={{ minHeight: "90vh" }}>
          <div className="pt-[45vh] sm:pt-[40vh] text-right max-w-[500px]">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/50 mb-4">Testing</p>
            <h2 className="text-[28px] sm:text-[40px] lg:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] text-white mb-5" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
              Beyond wellness.<br />Beyond healthcare.
            </h2>
            <p className="text-[13px] sm:text-[14px] text-white/70 leading-[1.75] ml-auto max-w-[400px]">
              Revivex is building the next-generation health ecosystem — designed to help people better understand, support, and optimize how they feel through proactive wellness, personalized products, recovery systems, intelligent insights, and connected health experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
