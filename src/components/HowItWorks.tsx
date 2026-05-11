"use client";

import { useState } from "react";

const paths = [
  {
    id: "testing",
    label: "Start with Testing",
    subtitle: "The complete picture — begin with a lab panel, then layer in your wearables.",
    steps: [
      {
        number: "01",
        title: "Order your lab test",
        description: "A simple blood draw measures 100+ biomarkers — hormones, metabolic markers, nutrients, and more.",
        icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      },
      {
        number: "02",
        title: "Download the app",
        description: "Your Revivex health hub. All your data, insights, and protocols in one place.",
        icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
      },
      {
        number: "03",
        title: "See your results",
        description: "Get a complete picture of your biology — explained clearly, not buried in medical jargon.",
        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      },
      {
        number: "04",
        title: "Connect wearables",
        description: "Pair your Revivex Tech or third-party devices. Real-time biometrics, 24/7.",
        icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      },
      {
        number: "05",
        title: "Receive recommendations",
        description: "AI-built protocols — supplements, habits, lifestyle changes — built around your exact data.",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
      },
    ],
  },
  {
    id: "tech",
    label: "Start with Tech",
    subtitle: "No lab test needed — connect your wearables and let your data do the work.",
    steps: [
      {
        number: "01",
        title: "Download the app",
        description: "Your Revivex health hub. All your data, insights, and protocols in one place.",
        icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
      },
      {
        number: "02",
        title: "Connect wearables",
        description: "Pair your Revivex Tech bracelet or any compatible device. Setup takes under 2 minutes.",
        icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      },
      {
        number: "03",
        title: "Track your data",
        description: "HRV, sleep, activity, stress — your body's signals, read continuously and stored securely.",
        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      },
      {
        number: "04",
        title: "Receive recommendations",
        description: "Personalized protocols built from your wearable data — upgrade anytime with a lab panel.",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
      },
    ],
  },
];

export default function HowItWorks({ defaultPath = "testing" }: { defaultPath?: string }) {
  const [active, setActive] = useState(paths.findIndex(p => p.id === defaultPath) ?? 0);
  const path = paths[active];

  return (
    <section className="relative z-20 bg-white border-t border-black/10">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-6 lg:px-10 py-16 sm:py-24">

        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/30 mb-3">Process</p>
          <h2 className="text-[32px] sm:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] text-[#0A0A0A]">
            How it works
          </h2>

          {/* Path switcher pill */}
          <div className="mt-6 sm:mt-8 inline-flex items-center rounded-full bg-black/5 p-1 gap-1">
            {paths.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className="relative rounded-full px-4 sm:px-5 py-2 text-[12px] sm:text-[13px] font-semibold transition-all duration-200 whitespace-nowrap"
                style={{
                  background: active === i ? "#0f1f38" : "transparent",
                  color: active === i ? "#fff" : "rgba(10,10,10,0.45)",
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          <p className="mt-4 sm:mt-5 text-[13px] sm:text-[14px] text-black/45 max-w-sm sm:max-w-md leading-[1.7]">
            {path.subtitle}
          </p>
        </div>

        {/* Steps — 1 col mobile, 2 col tablet, all in a row desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {path.steps.map((step, i) => (
            <div
              key={step.number}
              className="relative flex flex-col gap-5 rounded-[18px] sm:rounded-[20px] border border-black/10 bg-[#FAFAFA] p-5 sm:p-7 overflow-hidden"
            >
              {/* Step number watermark */}
              <span className="absolute top-3 right-4 text-[44px] sm:text-[52px] font-bold text-black/5 leading-none select-none pointer-events-none">
                {step.number}
              </span>

              {/* Icon */}
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/5 border border-black/10 flex-shrink-0">
                <svg className="h-4 w-4 text-black/50" fill="none" viewBox="0 0 24 24">
                  <path d={step.icon} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div>
                <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#0A0A0A] leading-snug mb-1.5">
                  {step.title}
                </h3>
                <p className="text-[12px] sm:text-[13px] text-black/50 leading-[1.65]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
