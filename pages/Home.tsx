
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

export const Home: React.FC = () => {
  return (
    <>
      <div id="hero">
        <Hero />
      </div>
      
      <div id="about" className="reveal">
        <Hook />
      </div>

      <BrandCarousel />

      <div id="services" className="reveal">
        <Services
          heading={<>One Platform. <span className="text-gradient">Endless Possibilities.</span></>}
          subheading="Everything you need to build global fandom, commercial growth and create real-world outcomes"
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
