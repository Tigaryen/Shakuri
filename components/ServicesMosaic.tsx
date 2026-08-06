
import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';

export const ServicesMosaic: React.FC = () => {
  return (
    <section className="bg-[#050505] px-6 pb-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.id}
              to="/services"
              aria-label={`${service.label} — ${service.tagline}`}
              className="group relative reveal aspect-[4/3]"
            >
              {/* Gradient bloom from the tile edge on hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 rounded-[1.75rem] bg-shakuri-gradient opacity-0 blur-2xl transition-opacity duration-500 ease-out group-hover:opacity-60"
              ></div>

              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]">
                <img
                  src={service.image}
                  alt={service.alt}
                  width={service.width}
                  height={service.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Dark gradient overlay, lightens on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 ease-out group-hover:opacity-70"></div>

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h3 className="text-2xl font-black uppercase leading-none tracking-tighter text-white md:text-3xl">
                    {service.label}
                  </h3>
                  <p className="mt-2 text-xs font-medium leading-snug text-gray-300 md:text-sm">
                    {service.tagline}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
