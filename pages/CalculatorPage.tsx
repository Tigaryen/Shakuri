
import React, { useState } from 'react';

const MINUTES_PER_YEAR = 525600;
const TV_SPOT_MINUTES = 0.5; // a 30-second spot
const TIKTOK_VIEW_MINUTES = 0.05; // a 3-second view

const nf = new Intl.NumberFormat('en-GB');
const formatInt = (n: number) => nf.format(Math.round(n));
const formatMoney = (n: number) => '$' + nf.format(Math.round(n));

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ label, value, min, max, step, display, onChange }) => (
  <div>
    <div className="flex items-baseline justify-between mb-4 gap-4">
      <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">{label}</span>
      <span className="text-2xl font-black tracking-tighter text-white">{display}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label={label}
      className="w-full accent-[#00D1FF] cursor-pointer"
    />
  </div>
);

const Result: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center">
    <h4 className="text-4xl md:text-5xl font-black tracking-tighter text-gradient leading-none">
      {value}
    </h4>
    <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-gray-400">{label}</p>
  </div>
);

const EarnedMediaValue: React.FC = () => {
  const [visits, setVisits] = useState(1200000);
  const [sessionMinutes, setSessionMinutes] = useState(9);
  const [cpm, setCpm] = useState(12);

  const impressions = visits * (sessionMinutes * 2);
  const monthlyEmv = (impressions * cpm) / 1000;
  const engagementMinutes = visits * sessionMinutes;

  return (
    <section className="reveal relative overflow-hidden rounded-[2.5rem] border border-white/10 glass p-8 md:p-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-shakuri-gradient opacity-[0.06]"
      ></div>

      <div className="relative">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-10">
          Earned Media Value
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-10">
            <Slider
              label="Monthly visits"
              value={visits}
              min={100000}
              max={20000000}
              step={100000}
              display={formatInt(visits)}
              onChange={setVisits}
            />
            <Slider
              label="Average session minutes"
              value={sessionMinutes}
              min={1}
              max={45}
              step={1}
              display={`${sessionMinutes} min`}
              onChange={setSessionMinutes}
            />
            <Slider
              label="CPM"
              value={cpm}
              min={1}
              max={60}
              step={1}
              display={`$${cpm}`}
              onChange={setCpm}
            />
          </div>

          <div className="grid gap-4">
            <Result label="Monthly EMV" value={formatMoney(monthlyEmv)} />
            <Result label="Annual EMV" value={formatMoney(monthlyEmv * 12)} />
            <Result label="Engagement minutes / month" value={formatInt(engagementMinutes)} />
          </div>
        </div>

        <p className="mt-12 text-sm text-gray-500 font-medium">
          Duration-adjusted impressions only, no quality multiplier. Treat as a floor, not a
          ceiling.
        </p>
      </div>
    </section>
  );
};

const Attention: React.FC = () => {
  const [visits, setVisits] = useState(2000000);
  const [sessionMinutes, setSessionMinutes] = useState(12);

  const engagedMinutes = visits * sessionMinutes;
  const humanYears = engagedMinutes / MINUTES_PER_YEAR;
  const tvSpots = engagedMinutes / TV_SPOT_MINUTES;
  const tiktokImpressions = engagedMinutes / TIKTOK_VIEW_MINUTES;

  return (
    <section className="reveal relative overflow-hidden rounded-[2.5rem] border border-white/10 glass p-8 md:p-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-shakuri-gradient opacity-[0.06]"
      ></div>

      <div className="relative">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-10">
          Attention
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-10">
            <Slider
              label="Expected visits"
              value={visits}
              min={100000}
              max={50000000}
              step={100000}
              display={formatInt(visits)}
              onChange={setVisits}
            />
            <Slider
              label="Average session minutes"
              value={sessionMinutes}
              min={1}
              max={45}
              step={1}
              display={`${sessionMinutes} min`}
              onChange={setSessionMinutes}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Result label="Total engaged minutes" value={formatInt(engagedMinutes)} />
            <Result label="Human years of attention" value={formatInt(humanYears)} />
            <Result label="Equivalent TV 30-second spots" value={formatInt(tvSpots)} />
            <Result label="TikTok impressions needed" value={formatInt(tiktokImpressions)} />
          </div>
        </div>

        <p className="mt-12 text-sm text-gray-500 font-medium">
          Directional channel comparisons, not guaranteed outcomes.
        </p>
      </div>
    </section>
  );
};

export const CalculatorPage: React.FC = () => {
  return (
    <div className="bg-[#050505] px-6 md:px-12 pt-40 pb-32">
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-16">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter">
            The Roblox <span className="text-gradient">Value Calculator</span>
          </h1>
        </div>

        <div className="space-y-8">
          <EarnedMediaValue />
          <Attention />
        </div>
      </div>
    </div>
  );
};
