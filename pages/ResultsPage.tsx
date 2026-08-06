
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Gamepad2,
  Gift,
  LayoutTemplate,
  Link2,
  ListChecks,
  MessageSquare,
  Radio,
  Store,
  TrendingUp,
  UserCheck,
} from 'lucide-react';

const measures = [
  {
    icon: <BarChart3 className="w-8 h-8 text-[#00D1FF]" />,
    title: 'In-experience metrics',
    line: 'Visits, engagement time, repeat visitation, approval ratings and where players dwell.',
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-[#FF00CC]" />,
    title: 'Third-party brand lift',
    line: 'Independent studies measuring consideration and perception against a control audience.',
  },
  {
    icon: <Link2 className="w-8 h-8 text-[#BD00FF]" />,
    title: 'Direct attribution',
    line: 'Virtual rewards tied to real-world actions, so impact is measurable off-platform.',
  },
  {
    icon: <Radio className="w-8 h-8 text-[#00FF94]" />,
    title: 'Social listening',
    line: 'Earned reach and sentiment tracked across YouTube and TikTok.',
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-[#FF8A00]" />,
    title: 'In-experience surveys',
    line: 'Short brand surveys delivered in context, fully anonymised.',
  },
];

const flow = [
  {
    icon: <Gamepad2 className="w-7 h-7" />,
    label: 'In-game prompt',
    line: 'A challenge appears during peak moments.',
  },
  {
    icon: <LayoutTemplate className="w-7 h-7" />,
    label: 'Branded challenge page',
    line: 'A bespoke page in your brand.',
  },
  {
    icon: <ListChecks className="w-7 h-7" />,
    label: 'Complete tasks',
    line: 'Sign up, register, download, follow, refer.',
  },
  {
    icon: <UserCheck className="w-7 h-7" />,
    label: 'Link account',
    line: 'An anonymous player becomes a known fan.',
  },
  {
    icon: <BadgeCheck className="w-7 h-7" />,
    label: 'Verified instantly',
    line: 'No codes, no manual redemption.',
  },
  {
    icon: <Gift className="w-7 h-7" />,
    label: 'Rewarded in both worlds',
    line: 'In-game items and real-world value.',
  },
];

export const ResultsPage: React.FC = () => {
  return (
    <div className="bg-[#050505]">
      {/* Section A — Measurable Outcomes */}
      <section className="px-6 md:px-12 pt-40 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-16">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-6">
              Measurable <span className="text-gradient">Outcomes</span>
            </h1>
            <p className="text-2xl text-gray-500 max-w-2xl font-medium leading-relaxed">
              Everything inside a Roblox experience is instrumented. You see exactly what your
              investment returned.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {measures.map((m) => (
              <div
                key={m.title}
                className="reveal group relative rounded-[2rem] glass border border-white/10 p-10 transition-all duration-500 hover:border-white/20"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[2rem] bg-shakuri-gradient opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.14]"
                ></div>
                <div className="relative">
                  <div className="mb-8 p-4 bg-white/5 w-fit rounded-[1.25rem] transition-all group-hover:bg-white/10 group-hover:scale-110">
                    {m.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">{m.title}</h3>
                  <p className="text-gray-400 font-medium leading-relaxed">{m.line}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section B — Real-World Outcomes */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-16">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
              Real-World <span className="text-gradient">Outcomes</span>
            </h2>
            <p className="text-2xl text-gray-500 max-w-2xl font-medium leading-relaxed">
              Attention is the easy part. This is the layer that converts it.
            </p>
          </div>

          {/* Six-step flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-20">
            {flow.map((step, idx) => (
              <div
                key={step.label}
                className="reveal group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-500 hover:border-white/25 hover:bg-white/[0.08]"
              >
                <span className="block text-5xl font-black tracking-tighter text-gradient leading-none mb-5">
                  {idx + 1}
                </span>
                <div className="text-white/70 mb-4 transition-colors group-hover:text-white">
                  {step.icon}
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.15em] mb-3 leading-tight">
                  {step.label}
                </h3>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">{step.line}</p>
              </div>
            ))}
          </div>

          {/* In game / Real world */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="reveal relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-10 md:p-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 bg-shakuri-gradient opacity-20 blur-3xl"
              ></div>
              <div className="relative">
                <Gamepad2 className="w-10 h-10 text-[#00D1FF] mb-6" />
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-5">
                  In game
                </h3>
                <p className="text-xl text-gray-300 font-medium leading-relaxed mb-4">
                  Unlockable levels, collectibles, emotes, avatar items.
                </p>
                <p className="text-lg text-gray-500 font-medium">
                  Drives engagement, retention and status.
                </p>
              </div>
            </div>

            <div className="reveal relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-10 md:p-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 bg-shakuri-gradient opacity-20 blur-3xl"
              ></div>
              <div className="relative">
                <Store className="w-10 h-10 text-[#00FF94] mb-6" />
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-5">
                  Real world
                </h3>
                <p className="text-xl text-gray-300 font-medium leading-relaxed mb-4">
                  Loyalty points, offers, discount codes, priority access.
                </p>
                <p className="text-lg text-gray-500 font-medium">
                  Drives revenue, first-party data and loyalty.
                </p>
              </div>
            </div>
          </div>

          <p className="reveal mt-10 text-sm text-gray-500 font-medium">
            Powered by our rewards technology.
          </p>

          <div className="reveal mt-16 text-center">
            <Link
              to="/#contact"
              className="btn-glow-multi inline-block bg-shakuri-gradient px-8 sm:px-12 py-5 sm:py-6 rounded-[2rem] text-base sm:text-xl font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white transition-all active:scale-95"
            >
              Speak to the team <ArrowRight className="inline-block ml-2 -mt-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
