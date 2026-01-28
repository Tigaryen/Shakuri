
import React from 'react';
import { ContactForm } from '../components/ContactForm';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-black min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="reveal text-center mb-16">
          <span className="text-pink-500 font-black tracking-[0.4em] uppercase text-xs mb-4 block">GET IN TOUCH</span>
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none mb-4">LET'S TALK</h1>
          <p className="text-xl text-gray-500 max-w-xl mx-auto font-medium">Whether you're ready to build or just have questions, we're here to help you navigate the Roblox ecosystem.</p>
        </div>
        <div className="reveal">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};
