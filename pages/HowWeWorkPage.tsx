import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Box,
  Globe,
  Trophy,
  Swords,
  Joystick,
  Users,
  Puzzle,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import { BrandCarousel } from '../components/BrandCarousel';
import page from '../content/pages/how-we-work.json';

// Words are edited in the CMS (content/pages/how-we-work.json); positions, icons and colours stay in code.
const c = page.slots as Record<string, any>;

// In-house capabilities: the dark pills on the inner ring.
const inHouseSpots = [
  // Placed in the gaps between the partner spokes so no line runs behind a pill.
  { label: 'Creative', x: 50, y: 23 },
  { label: 'Strategy', x: 77, y: 50 },
  { label: 'Production', x: 69.1, y: 69.1 },
  { label: 'Marketing', x: 30.9, y: 69.1 },
  { label: 'Management', x: 23, y: 50 },
];

// Specialist partners by genre and platform: the white cards on the outer ring.
// x/y are percentages of the square diagram; spokes run from the centre to each.
const partnerSpots: { label: string; icon: LucideIcon; color: string; x: number; y: number }[] = [
  // Eight cards evenly spaced on a radius of 40, with the two platforms side
  // by side at the top.
  { label: 'Roblox', icon: Box, color: '#00D1FF', x: 34.7, y: 13 },
  { label: 'Fortnite', icon: Layers, color: '#5674FF', x: 65.3, y: 13 },
  { label: 'Immersive brand worlds', icon: Globe, color: '#FF00CC', x: 87, y: 34.7 },
  { label: 'Competitive sports games', icon: Trophy, color: '#BD00FF', x: 87, y: 65.3 },
  { label: 'RPGs', icon: Swords, color: '#5674FF', x: 65.3, y: 87 },
  { label: 'Simulators', icon: Joystick, color: '#BD00FF', x: 34.7, y: 87 },
  { label: 'Social experiences', icon: Users, color: '#FF00CC', x: 13, y: 65.3 },
  { label: 'Branded integrations', icon: Puzzle, color: '#BD00FF', x: 13, y: 34.7 },
];

const SPECTRUM =
  'linear-gradient(90deg, #FF8A00 0%, #FF00CC 25%, #BD00FF 50%, #00D1FF 75%, #00FF94 100%)';

const gradientBorder = (fill: string) => ({
  background: `linear-gradient(${fill}, ${fill}) padding-box, ${SPECTRUM} border-box`,
  border: '2px solid transparent',
});

// labels come from the CMS, matched to the fixed spots by position
const labelled = <T extends { label: string }>(spots: T[], items: { t: string }[] = []) =>
  spots.map((s, i) => ({ ...s, label: items[i]?.t || s.label }));
const listText = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}` : xs.join(''));

const NetworkDiagram: React.FC = () => {
  const inHouse = labelled(inHouseSpots, c['diagram.inHouse']);
  const partners = labelled(partnerSpots, c['diagram.partners']);
  const lower = (t: string) => t.replace(/^[A-Z][a-z]/, (m) => m.toLowerCase()); // keeps RPGs, GTA
  const aria = `Shakuri at the centre providing ${lower(String(c['diagram.hub']))}, with in-house ${listText(inHouse.map((n) => lower(n.label)))}, connected to specialist development partners for ${listText(partners.map((p, i) => (i < 2 ? p.label : lower(p.label))))}.`;
  return (
  <div
    className="relative w-full max-w-[720px] aspect-square"
    style={{ containerType: 'inline-size' }}
    role="img"
    aria-label={aria}
  >
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hww-net" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF8A00" />
          <stop offset=".25" stopColor="#FF00CC" />
          <stop offset=".5" stopColor="#BD00FF" />
          <stop offset=".75" stopColor="#00D1FF" />
          <stop offset="1" stopColor="#00FF94" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth=".3" />
      <circle
        cx="50"
        cy="50"
        r="27"
        fill="none"
        stroke="rgba(255,255,255,.18)"
        strokeWidth=".3"
        strokeDasharray="1 1.2"
      />
      <g stroke="url(#hww-net)" strokeWidth=".45" strokeLinecap="round" opacity=".85">
        {partners.map((p, i) => (
          <line key={i} x1="50" y1="50" x2={p.x} y2={p.y} />
        ))}
      </g>
    </svg>

    {/* Hub */}
    <div
      className="absolute rounded-full grid place-items-center content-center text-center shadow-[0_0_48px_-12px_rgba(255,0,204,0.45)]"
      style={{
        left: '35%',
        top: '35%',
        width: '30%',
        height: '30%',
        gap: '1.2cqw',
        background: `linear-gradient(#0a0a0a, #0a0a0a) padding-box, ${SPECTRUM} border-box`,
        border: '3px solid transparent',
      }}
    >
      <img src="/shakuri_logo.png" alt="" className="select-none" style={{ height: '11cqw', width: '11cqw', margin: '-1.5cqw 0' }} />
      <div
        className="font-black tracking-tight text-white leading-none"
        style={{ fontSize: 'clamp(11px, 2.6cqw, 19px)' }}
      >
        SHAKURI
      </div>
      <div
        className="font-bold uppercase text-gray-300 leading-snug"
        style={{ fontSize: 'clamp(7px, 1.35cqw, 10px)', letterSpacing: '0.14em', maxWidth: '20cqw' }}
      >
        {c['diagram.hub']}
      </div>
    </div>

    {inHouse.map((n, i) => (
      <div
        key={i}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#151519] border border-white/15 font-bold text-white whitespace-nowrap leading-none"
        style={{
          left: `${n.x}%`,
          top: `${n.y}%`,
          padding: '1.2cqw 2.2cqw',
          fontSize: 'clamp(9px, 2cqw, 15px)',
        }}
      >
        {n.label}
      </div>
    ))}

    {partners.map(({ label, icon: Icon, color, x, y }, i) => (
      <div
        key={i}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl grid justify-items-center text-center"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: '19cqw',
          padding: '1.6cqw 1.2cqw',
          gap: '0.8cqw',
          ...gradientBorder('#ffffff'),
        }}
      >
        <Icon style={{ color, width: 'clamp(14px, 3.2cqw, 22px)', height: 'clamp(14px, 3.2cqw, 22px)' }} strokeWidth={1.5} />
        <div
          className="font-black text-gray-900 leading-tight"
          style={{ fontSize: 'clamp(8px, 1.8cqw, 14px)' }}
        >
          {label}
        </div>
      </div>
    ))}
  </div>
  );
};

export const HowWeWorkPage: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-[#050505] px-6 md:px-12 pt-40 pb-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 55% at 85% 20%, rgba(189,0,255,0.16) 0%, transparent 100%), radial-gradient(60% 60% at 20% 30%, rgba(255,0,204,0.14) 0%, transparent 100%)',
        }}
      />

      <div className="relative mx-auto max-w-[1440px] grid gap-16 lg:gap-24 lg:grid-cols-2 items-center">
        <div className="reveal grid gap-7 max-w-[640px]">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">{c['intro.kicker']}</p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95]">
            {c['intro.headBefore']} <span className="text-gradient">{c['intro.headHighlight']}</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium leading-relaxed text-white">
            {c['intro.lead']}
          </p>
          <div className="grid gap-5 text-lg font-medium leading-relaxed text-gray-400">
            {String(c['intro.body']).split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean).map((t, i) => <p key={i}>{t}</p>)}
          </div>
        </div>

        <div className="reveal grid gap-6 justify-items-center">
          <NetworkDiagram />
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs font-bold uppercase tracking-[0.14em] text-gray-300">
            <span className="flex items-center gap-2.5">
              <i className="w-[26px] h-[14px] rounded-full bg-[#151519] border border-white/15" />
              {c['diagram.legendInHouse']}
            </span>
            <span className="flex items-center gap-2.5">
              <i className="w-[22px] h-4 rounded-[5px]" style={gradientBorder('#ffffff')} />
              {c['diagram.legendPartners']}
            </span>
          </div>
        </div>
      </div>

      <div className="relative -mx-6 md:-mx-12 mt-16 md:mt-24">
        <BrandCarousel variant="how-we-work" />
      </div>

      <div className="reveal relative mt-8 text-center">
        <p className="mb-8 text-xl font-medium text-gray-400">
          {c['close.line']}
        </p>
        <Link
          to="/#contact"
          className="btn-glow-multi inline-flex max-w-full items-center gap-3 rounded-[2rem] bg-shakuri-gradient px-8 sm:px-12 py-5 sm:py-6 text-base sm:text-xl font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white transition-all active:scale-95"
        >
          {c['close.button']} <ArrowRight className="w-5 h-5 shrink-0" />
        </Link>
      </div>
    </div>
  );
};
