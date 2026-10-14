
import React from 'react';
import { Hero } from '../components/Hero';
import { Hook } from '../components/Hook';
import { BrandCarousel } from '../components/BrandCarousel';
import { Services } from '../components/Services';
import { ServicesMosaic } from '../components/ServicesMosaic';
import { ProofBar } from '../components/ProofBar';
import { ValueCTA } from '../components/ValueCTA';
import { BrandAnimation } from '../components/BrandAnimation';
import { ContactForm } from '../components/ContactForm';
import home from '../content/pages/home.json';

const c = home.slots;

export const Home: React.FC = () => {
  return (
    <>
      <div id="hero">
        <Hero />
      </div>
      
      <div id="about" className="reveal">
        <Hook />
      </div>

      <BrandCarousel variant="home" />

      <div id="services" className="reveal">
        <Services
          heading={<>{c['services.heading']} <span className="text-gradient">{c['services.highlight']}</span></>}
          subheading={c['services.sub']}
          showCards={false}
        />
      </div>

      <ServicesMosaic />

      <ProofBar />

      <ValueCTA />

      <BrandAnimation />

      <div id="contact" className="reveal">
        <ContactForm />
      </div>
    </>
  );
};
