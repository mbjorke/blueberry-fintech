import React, { useState, useEffect } from 'react';
import { CheckCircle2, Mail, Linkedin } from 'lucide-react';
import { getBrandfetchLogo, BRAND_DOMAINS, BANK_DOMAINS } from '@/utils/brandfetch';
import { useLanguage } from '@/contexts/LanguageContext';
import { Logo } from '@/components/ui/logo';
import { AvatarWithIcon } from '@/components/ui/avatar-with-icon';

const Experience: React.FC = () => {
  const { t } = useLanguage();
  const [currentBankIndex, setCurrentBankIndex] = useState(0);

  // Rotate bank logos every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBankIndex((prev) => (prev + 1) % BANK_DOMAINS.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const currentBankLogo = getBrandfetchLogo(BANK_DOMAINS[currentBankIndex], 96, 96);

  return (
    <section id="erfarenhet" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{t('experience.title')}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1: Crosskey */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
            {/* Small bubble in top right corner with gradients inside */}
            <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-4 -mt-4 overflow-hidden">
              <div className="absolute inset-0 bg-blue-500 opacity-20 blur-2xl"></div>
              <div className="absolute inset-0 bg-indigo-500 opacity-20 blur-2xl"></div>
              <div className="absolute inset-0 bg-blue-50"></div>
            </div>
            
            {/* Centered logo */}
            <div className="flex flex-col items-center mb-6 relative z-10">
              <div className="flex-shrink-0 mb-4">
                <div className="w-24 h-24 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center overflow-hidden p-3 relative shadow-sm">
                  <img 
                    key={currentBankIndex}
                    src={currentBankLogo}
                    alt="Bank logo"
                    className="w-full h-full object-contain animate-fade-in"
                    onError={(e) => {
                      // Hide logo if it fails to load and try next one
                      const img = e.target as HTMLImageElement;
                      img.style.display = 'none';
                      // Try next logo after a short delay
                      setTimeout(() => {
                        const nextIndex = (currentBankIndex + 1) % BANK_DOMAINS.length;
                        setCurrentBankIndex(nextIndex);
                      }, 100);
                    }}
                    onLoad={(e) => {
                      // Show logo when it loads successfully
                      const img = e.target as HTMLImageElement;
                      img.style.display = 'block';
                    }}
                  />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900">{t('experience.crosskey.title')}</h3>
                <p className="text-slate-500 text-sm">{t('experience.crosskey.role')}</p>
              </div>
            </div>
            <p className="text-slate-600 mb-4">
              {t('experience.crosskey.description')}
            </p>
            <ul className="space-y-2 text-sm text-slate-500 relative z-10">
              {t<string[]>('experience.crosskey.skills').map((skill, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500 mt-0.5" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Blueberry Maybe */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
            {/* Small bubble in top right corner with gradients inside */}
            <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-4 -mt-4 overflow-hidden">
              <div className="absolute inset-0 bg-indigo-500 opacity-20 blur-2xl"></div>
              <div className="absolute inset-0 bg-blue-600 opacity-20 blur-2xl"></div>
              <div className="absolute inset-0 bg-indigo-50"></div>
            </div>
            
            {/* Centered logo */}
            <div className="flex flex-col items-center mb-6 relative z-10">
              <div className="flex-shrink-0 mb-4">
                <AvatarWithIcon
                  imageUrl="/blueberry-logo.svg"
                  name="Blueberry"
                  icon={undefined}
                  colorClass="bg-slate-900"
                  iconColorClass="text-white"
                  size={96}
                  className="[&_img]:object-contain [&_img]:p-3"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900">{t('experience.blueberry.title')}</h3>
                <p className="text-slate-500 text-sm">{t('experience.blueberry.role')}</p>
              </div>
            </div>
            <p className="text-slate-600 mb-4">
              {t('experience.blueberry.description')}
            </p>
             <ul className="space-y-2 text-sm text-slate-500 relative z-10">
              {t<string[]>('experience.blueberry.skills').map((skill, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500 mt-0.5" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3: Education */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
            {/* Small bubble in top right corner with gradients inside */}
            <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-4 -mt-4 overflow-hidden">
              <div className="absolute inset-0 bg-purple-500 opacity-20 blur-2xl"></div>
              <div className="absolute inset-0 bg-indigo-500 opacity-20 blur-2xl"></div>
              <div className="absolute inset-0 bg-purple-50"></div>
            </div>
            
            {/* Centered logo */}
            <div className="flex flex-col items-center mb-6 relative z-10">
              <div className="flex-shrink-0 mb-4">
                <div className="w-24 h-24 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center overflow-hidden p-3 shadow-sm">
                  <img 
                    src={getBrandfetchLogo(BRAND_DOMAINS.uppsala, 96, 96)}
                    alt="Uppsala University logo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Hide logo if it fails to load
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900">{t('experience.hci.title')}</h3>
                <p className="text-slate-500 text-sm">{t('experience.hci.role')}</p>
              </div>
            </div>
            <p className="text-slate-600 mb-4">
              {t('experience.hci.description')}
            </p>
             <ul className="space-y-2 text-sm text-slate-500 relative z-10">
              {t<string[]>('experience.hci.skills').map((skill, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500 mt-0.5" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Contact & Opportunities */}
        <div id="bidrag" className="bg-slate-900 rounded-3xl p-8 lg:p-12 text-white">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Block: Contact */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">{t('experience.contribution.contact.title')}</h3>
              <p className="text-white text-lg mb-8 leading-relaxed">
                {t('experience.contribution.contact.description')}
              </p>

              {/* Contact Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <a 
                  href="mailto:marcus@blueberry.surf" 
                  className="flex items-center gap-4 bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-indigo-500 transition-colors group"
                >
                  <div className="bg-purple-500 p-3 rounded-lg flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-0.5">marcus@blueberry.surf</p>
                    <p className="text-xs text-slate-400 uppercase">{t('experience.contribution.contact.email')}</p>
                  </div>
                </a>
                
                <a 
                  href="https://linkedin.com/in/mbjorke" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-indigo-500 transition-colors group"
                >
                  <div className="bg-blue-500 p-3 rounded-lg flex-shrink-0">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-0.5">{t('experience.contribution.contact.linkedin')}</p>
                    <p className="text-xs text-slate-400 uppercase">{t('experience.contribution.contact.linkedinDesc')}</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Block: Open to Opportunities */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 h-full">
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {t('experience.contribution.opportunities.title')}
                </h4>
                <p className="text-white mb-6 leading-relaxed text-sm">
                  {t('experience.contribution.opportunities.description')}
                </p>
                <div className="flex flex-col gap-2">
                  {t<string[]>('experience.contribution.opportunities.skills').map((skill, idx) => (
                    <span key={idx} className="px-4 py-2 bg-blue-900 text-white rounded-full text-sm font-medium text-center">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;

