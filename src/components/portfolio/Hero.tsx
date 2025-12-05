import React from 'react';
import { ArrowRight, Anchor } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="om-mig" className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden bg-slate-900 text-white">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-500 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-600 opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              <span className="text-sm font-medium text-indigo-200">{t('hero.badge')}</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
              {t('hero.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">{t('hero.titleHighlight')}</span>.
            </h1>
            
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#ai-chat" 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/25"
              >
                {t('hero.ctaInterview')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a 
                href="#filosofi" 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-800 transition-all hover:text-white"
              >
                <Anchor className="mr-2 w-5 h-5" />
                {t('hero.ctaPhilosophy')}
              </a>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/marcus.jpg" 
                alt="Marcus Björke" 
                className="w-full h-auto object-cover"
              />
              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

