export default function BiomarkersSection() {
  return (
    <div className="relative bg-white pt-12 sm:pt-28">
      <div className="relative w-full overflow-hidden rounded-none sm:rounded-[10px]" style={{ minHeight: "100vh" }}>
        {/* Full-bleed background image */}
        <img
          src="/images/biomarkers-hero.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark scrim — bottom on mobile, right on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent sm:bg-gradient-to-l sm:from-black/60 sm:via-black/20 sm:to-transparent" />

        <div
          className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-6 lg:px-10 flex items-end sm:items-start justify-start sm:justify-end"
          style={{ minHeight: "100vh" }}
        >
          <div className="pb-10 sm:pb-0 sm:pt-[35vh] text-left sm:text-right max-w-[500px]">
            <h2
              className="text-[26px] sm:text-[40px] lg:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] text-white mb-4 sm:mb-5"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
            >
              Beyond wellness.<br />Beyond healthcare.
            </h2>
            <p className="text-[12px] sm:text-[14px] text-white/70 leading-[1.75] sm:ml-auto max-w-[340px] sm:max-w-[400px]">
              A health ecosystem built to help you understand your body, optimize how you feel, and take control of your wellness through personalized products, intelligent insights, and connected experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
