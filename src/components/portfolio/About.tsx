import React from 'react';
import { Wind, ShieldCheck, Activity, BrainCircuit } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  const philosophyPoints = [
    {
      title: t('about.philosophy.start.title'),
      content: t('about.philosophy.start.content'),
      highlight: false,
    },
    {
      title: t('about.philosophy.analytical.title'),
      content: t('about.philosophy.analytical.content'),
      highlight: false,
    },
    {
      title: t('about.philosophy.goodEnough.title'),
      content: t('about.philosophy.goodEnough.content'),
      highlight: true,
    },
    {
      title: t('about.philosophy.safety.title'),
      content: t('about.philosophy.safety.content'),
      highlight: false,
    },
  ];

  return (
    <section id="filosofi" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              {t('about.title')}
            </h2>
            <div className="prose prose-lg text-slate-600">
              <p className="mb-6">
                {t('about.story')}
              </p>
              <p className="mb-6 border-l-4 border-indigo-500 pl-4 italic bg-slate-50 py-4 pr-4 rounded-r-lg">
                "{t('about.quote')}"
              </p>
              <p>
                {t('about.conclusion')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {philosophyPoints.map((point, index) => (
              <div 
                key={index}
                className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  point.highlight 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xl' 
                    : 'bg-white border-slate-200 text-slate-800 hover:shadow-lg'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  point.highlight ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  {index === 0 && <BrainCircuit className="w-6 h-6" />}
                  {index === 1 && <Activity className="w-6 h-6" />}
                  {index === 2 && <ShieldCheck className="w-6 h-6" />}
                  {index === 3 && <Wind className="w-6 h-6" />}
                </div>
                <h3 className="text-lg font-bold mb-2">{point.title}</h3>
                <p className={`text-sm leading-relaxed ${point.highlight ? 'text-slate-300' : 'text-slate-600'}`}>
                  {point.content}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;

