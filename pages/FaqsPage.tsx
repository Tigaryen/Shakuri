
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { faqSections, type Faq } from '../data/faqs';

const FaqItem: React.FC<{ faq: Faq }> = ({ faq }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 transition-colors duration-500 hover:border-white/20">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full min-h-[44px] items-center justify-between gap-6 px-6 py-6 text-left md:px-8"
      >
        <span className="text-lg font-black tracking-tight text-white md:text-xl">{faq.q}</span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-gray-400 transition-transform duration-500 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${
          open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-8 md:px-8">
          <p className="font-medium leading-relaxed text-gray-400 md:text-lg">{faq.a}</p>
          {faq.source && (
            <p className="mt-4 text-xs font-medium tracking-wide text-gray-500">
              Source: {faq.source}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export const FaqsPage: React.FC = () => {
  return (
    <div className="bg-[#050505] px-6 md:px-12 pt-40 pb-32">
      <div className="mx-auto max-w-5xl">
        <div className="reveal mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
            Roblox for Brands: <span className="text-gradient">Frequently Asked Questions</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-400 max-w-3xl">
            The questions brand teams actually ask before committing to Roblox. Straight answers,
            sourced where it matters.
          </p>
        </div>

        <div className="space-y-16">
          {faqSections.map((section) => (
            <section key={section.title} className="reveal">
              <h2 className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-gradient">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.faqs.map((faq) => (
                  <FaqItem key={faq.q} faq={faq} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="reveal mt-20 text-center">
          <p className="mb-8 text-xl font-medium text-gray-400">
            Still have a question we haven’t answered?
          </p>
          <Link
            to="/#contact"
            className="btn-glow-multi inline-flex max-w-full items-center gap-3 rounded-[2rem] bg-shakuri-gradient px-8 sm:px-12 py-5 sm:py-6 text-base sm:text-xl font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white transition-all active:scale-95"
          >
            Speak to the team <ArrowRight className="w-5 h-5 shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
};
