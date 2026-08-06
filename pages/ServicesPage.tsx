
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Services } from '../components/Services';
import { services } from '../data/services';

export const ServicesPage: React.FC = () => {
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
