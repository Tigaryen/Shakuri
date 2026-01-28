
import React from 'react';
import { Target, Zap, Construction } from 'lucide-react';

const serviceList = [
  {
    icon: <Target className="w-12 h-12 text-[#FF8A00] group-hover:rotate-[20deg] group-hover:scale-125 transition-all duration-500" />,
    title: 'Strategy',
    description: 'We craft tailored creative strategies designed to achieve long-lasting and high-impact results on Roblox & Fortnite.',
    hoverClass: 'light-up-orange'
  },
  {
    icon: <Zap className="w-12 h-12 text-[#BD00FF] group-hover:scale-150 group-hover:brightness-150 transition-all duration-500" />,
    title: 'Awareness',
    description: 'Tailored marketing solutions, ad campaigns, and influencer partnerships that cut through the noise.',
    hoverClass: 'light-up-purple'
  },
  {
    icon: <Construction className="w-12 h-12 text-[#00FF94] group-hover:-translate-y-2 group-hover:rotate-[-10deg] group-hover:scale-125 transition-all duration-500" />,
    title: 'Build',
    description: 'Design, develop, and launch your brand\'s own custom-built immersive experience on Roblox and Fortnite.',
    hoverClass: 'light-up-cyan'
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">OUR SERVICES</h2>
          <p className="text-2xl text-gray-500 max-w-xl font-medium leading-relaxed">Everything you need to successfully launch and scale.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {serviceList.map((service, idx) => (
            <div 
              key={idx}
              className={`p-12 rounded-[3rem] glass border border-white/10 transition-all duration-500 group bloom-hover ${service.hoverClass}`}
            >
              <div className="mb-10 p-5 bg-white/5 w-fit rounded-[1.5rem] transition-all group-hover:bg-white/10 group-hover:scale-110">
                {service.icon}
              </div>
              <h3 className="text-3xl font-black mb-5 tracking-tight uppercase group-hover:text-white transition-colors">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed text-lg font-medium group-hover:text-gray-100 transition-colors">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
