
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, ChevronDown, Puzzle, Rocket, Target } from 'lucide-react';
import { Services } from '../components/Services';
import { services } from '../data/services';

const integrationSteps = [
  {
    icon: <CalendarDays className="w-7 h-7 text-[#FF8A00]" />,
    title: 'Impact moment in marketing calendar',
    description:
      'Select the moments in your seasonal calendar that benefit most from amplification.',
    bullets: ['Product launch', 'Announcement moments', 'Campaign launch', 'Seasonal moments'],
  },
  {
    icon: <Puzzle className="w-7 h-7 text-[#BD00FF]" />,
    title: 'Match with Roblox experience',
    description:
      'We match your moment with the right experience, connecting you to an engaged, high-traffic built-in audience.',
    bullets: [],
  },
  {
    icon: <Rocket className="w-7 h-7 text-[#FF00CC]" />,
    title: 'Activation launch period',
    description:
      'The takeover goes live, using your IP to enhance gameplay, not force it. Games, shareable moments, competitions and rewards in a short, sharp window.',
    bullets: [],
  },
  {
    icon: <Target className="w-7 h-7 text-[#00FF94]" />,
    title: 'Drive engagement and real-world actions',
    description:
      'The launch coincides with a real-world moment, with in-game rewards leading to measurable real-world actions.',
    bullets: [
      'Discount codes',
      'Special offers',
      'Sign-ups',
      'Loyalty engagement',
      'Ticket purchasing',
    ],
  },
];

export const ServicesPage: React.FC = () => {
  const [formulaOpen, setFormulaOpen] = useState(false);

  return (
    <>
      {/* The homepage services hub, unchanged */}
      <Services />

      <section className="bg-[#050505] px-6 pb-32 md:px-12">
        <div className="mx-auto max-w-7xl space-y-8">
          {services.map((service, idx) => (
            <article
              key={service.id}
              className="reveal glass group relative overflow-hidden rounded-[3rem] border border-white/10 transition-all duration-500 hover:border-white/20"
            >
              {/* Dark gradient wash in the brand ramp */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-shakuri-gradient opacity-[0.07] transition-opacity duration-500 group-hover:opacity-[0.14]"
              ></div>

              <div className="relative grid items-center gap-10 p-8 md:gap-16 md:p-14 lg:grid-cols-2">
                <div>
                  <span className="mb-4 block text-xs font-black uppercase tracking-[0.3em] text-gradient">
                    {service.eyebrow}
                  </span>
                  <h2 className="mb-5 text-4xl font-black uppercase leading-none tracking-tighter text-white md:text-6xl">
                    {service.title}
                  </h2>
                  {service.duration && (
                    <span className="mb-6 inline-block rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-gray-300">
                      {service.duration}
                    </span>
                  )}
                  <p className="text-lg font-medium leading-relaxed text-gray-400 md:text-xl">
                    {service.description}
                  </p>

                  {service.id === 'brand-integrations' && (
                    <button
                      onClick={() => setFormulaOpen((open) => !open)}
                      aria-expanded={formulaOpen}
                      aria-controls="integration-formula"
                      className="btn-glow-multi mt-8 inline-flex items-center gap-3 rounded-[1.5rem] bg-shakuri-gradient px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition-all active:scale-95"
                    >
                      The Integration Winning Formula
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-500 ${
                          formulaOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>

                <figure
                  className={`overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] ${
                    idx % 2 !== 0 ? 'lg:order-first' : ''
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.alt}
                    width={service.width}
                    height={service.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </figure>
              </div>

              {service.id === 'brand-integrations' && (
                <div
                  id="integration-formula"
                  className={`relative overflow-hidden transition-all duration-500 ease-out ${
                    formulaOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="grid gap-4 border-t border-white/10 p-8 md:grid-cols-2 md:p-14">
                    {integrationSteps.map((step, stepIdx) => (
                      <div
                        key={step.title}
                        className="rounded-[2rem] border border-white/10 bg-white/5 p-8"
                      >
                        <div className="mb-6 flex items-center gap-4">
                          <span className="text-4xl font-black leading-none tracking-tighter text-gradient">
                            {stepIdx + 1}
                          </span>
                          <div className="rounded-[1rem] bg-white/5 p-3">{step.icon}</div>
                        </div>
                        <h3 className="mb-4 text-xl font-black uppercase tracking-tight text-white">
                          {step.title}
                        </h3>
                        <p className="font-medium leading-relaxed text-gray-400">
                          {step.description}
                        </p>
                        {step.bullets.length > 0 && (
                          <ul className="mt-6 flex flex-wrap gap-2">
                            {step.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-gray-300"
                              >
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="reveal mx-auto mt-20 max-w-7xl text-center">
          <p className="text-sm font-medium tracking-wide text-gray-500">
            Pricing on brief. Scope-dependent.
          </p>
          <Link
            to="/#contact"
            className="btn-glow-cyan mx-auto mt-8 flex w-fit items-center gap-4 rounded-2xl bg-white px-12 py-6 text-xl font-black uppercase tracking-[0.2em] text-black transition-all active:scale-90"
          >
            Speak to the team <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
};
