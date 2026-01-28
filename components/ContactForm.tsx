
import React, { useState } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export const ContactForm: React.FC = () => {
  // Your live Formspree ID
  const FORMSPREE_ID = 'xbdoppyo'; 
  
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Full End-to-End',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          _subject: `New Lead: ${formData.name} (${formData.service})`
        })
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const data = await response.json();
        console.error("Formspree Error:", data);
        setStatus('error');
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setStatus('error');
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', service: 'Full End-to-End', message: '' });
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <section id="contact" className="py-24 px-6 md:px-12 bg-black">
        <div className="max-w-4xl mx-auto glass p-12 md:p-24 rounded-[4rem] text-center border border-cyan-400/50 shadow-[0_0_100px_rgba(0,209,255,0.2)] animate-[reveal_0.8s_ease-out]">
          <div className="w-24 h-24 bg-shakuri-gradient rounded-full mx-auto mb-8 flex items-center justify-center animate-bounce shadow-[0_0_40px_rgba(0,209,255,0.6)]">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none text-gradient">Message Received</h2>
          <p className="text-2xl text-gray-400 font-medium max-w-lg mx-auto mb-12">
            We've notified the team. Expect to hear back from us at <span className="text-white">hello@shakuristudios.com</span> very soon.
          </p>
          <button 
            onClick={handleReset}
            className="text-xs font-black tracking-widest text-gray-500 hover:text-white uppercase transition-colors"
          >
            Send another message
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-black">
      <div className="max-w-4xl mx-auto glass p-8 md:p-20 rounded-[4rem] relative overflow-hidden group border border-white/10 transition-all duration-700 hover:border-cyan-400/50 hover:shadow-[0_0_100px_rgba(0,209,255,0.2)]">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-shakuri-gradient opacity-10 blur-[150px] transition-all duration-1000 group-hover:opacity-30 pointer-events-none"></div>
        
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-5xl md:text-[5rem] font-black mb-6 tracking-tighter uppercase leading-none group-hover:tracking-normal transition-all duration-1000">Build the future</h2>
          <p className="text-2xl text-gray-500 font-medium max-w-lg mx-auto">Tell us about your project and let's make magic.</p>
        </div>

        {status === 'error' && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-2xl text-red-500 text-center font-bold">
            There was an issue sending your message. Please check your connection or try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 px-3">Full Name</label>
              <input 
                required
                name="name"
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-cyan-400 focus:bg-white/[0.08] transition-all placeholder:text-gray-800 text-lg" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 px-3">Email Address</label>
              <input 
                required
                name="email"
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="john@brand.com" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-purple-500 focus:bg-white/[0.08] transition-all placeholder:text-gray-800 text-lg" 
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 px-3">Service Needed</label>
            <div className="relative">
              <select 
                name="service"
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-pink-500 focus:bg-white/[0.08] transition-all appearance-none cursor-pointer text-lg"
              >
                <option className="bg-neutral-900" value="Creative Strategy">Creative Strategy</option>
                <option className="bg-neutral-900" value="Build & Experience Design">Build & Experience Design</option>
                <option className="bg-neutral-900" value="Marketing & Awareness">Marketing & Awareness</option>
                <option className="bg-neutral-900" value="Full End-to-End">Full End-to-End</option>
              </select>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xl">&darr;</div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 px-3">Your Message</label>
            <textarea 
              required
              name="message"
              rows={5} 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="How can we help your brand grow on Roblox?" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-cyan-400 focus:bg-white/[0.08] transition-all placeholder:text-gray-800 text-lg resize-none"
            ></textarea>
          </div>

          <button 
            disabled={status === 'submitting'}
            className="w-full bg-shakuri-gradient text-white font-black py-7 rounded-[2rem] text-2xl transition-all active:scale-95 btn-glow-multi tracking-[0.2em] uppercase relative overflow-hidden group/btn disabled:opacity-50 disabled:cursor-wait"
          >
            <span className="relative z-10">
              {status === 'submitting' ? 'SENDING...' : status === 'error' ? 'TRY AGAIN' : "LET'S PLAY"}
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
          </button>
        </form>
      </div>
    </section>
  );
};
