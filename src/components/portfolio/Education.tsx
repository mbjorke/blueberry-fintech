import React from 'react';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import { getBrandfetchLogo, BRAND_DOMAINS } from '@/utils/brandfetch';
import { useLanguage } from '@/contexts/LanguageContext';

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
}

interface Certification {
  name: string;
  note?: string;
}

const EDUCATION: EducationItem[] = [
  {
    institution: 'Uppsala University',
    degree: 'M.Sc. Human–Computer Interaction',
    period: 'Sep 1996 - Nov 2000'
  },
  {
    institution: 'Ålands Handelsläroverk',
    degree: 'Bachelor of Business',
    period: 'Sep 1995 - Jun 1997'
  },
  {
    institution: 'Ålands Lyceum',
    degree: 'Gymnasieexamen',
    period: '1993 - 1995'
  }
];

const CERTIFICATIONS: Certification[] = [
  { name: 'CSPO' },
  { name: 'IxDF Design Thinking', note: 'Top 10%' },
  { name: 'Sustainable Growth Design' },
  { name: 'Loopa with MAIA', note: '2025' },
  { name: 'Agile Project Management' },
  { name: 'Requirements Management' }
];

const Education: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="utbildning" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-700 mb-2">{t('education.title')}</h2>
          <p className="text-sm text-slate-500">
            {t('education.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Education */}
          <div>
            <h3 className="text-lg font-medium text-slate-600 mb-5 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-slate-400" />
              {t('education.educationLabel')}
            </h3>
            <div className="space-y-4">
              {EDUCATION.map((edu, index) => {
                // Get logo for Uppsala University
                const logoUrl = edu.institution === 'Uppsala University' 
                  ? getBrandfetchLogo(BRAND_DOMAINS.uppsala, 40, 40)
                  : null;
                
                return (
                  <div 
                    key={index}
                    className="bg-white rounded-lg p-4 border border-slate-200"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-3 flex-1">
                        {logoUrl && (
                          <img 
                            src={logoUrl}
                            alt={`${edu.institution} logo`}
                            className="w-10 h-10 object-contain flex-shrink-0"
                            onError={(e) => {
                              // Hide logo if it fails to load
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        )}
                        <h4 className="text-base font-medium text-slate-700">{edu.institution}</h4>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
                        <Calendar className="w-3 h-3" />
                        <span>{edu.period}</span>
                      </div>
                    </div>
                    <p className={`text-sm text-slate-500 ${logoUrl ? 'ml-[52px]' : ''}`}>{edu.degree}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-lg font-medium text-slate-600 mb-5 flex items-center gap-2">
              <Award className="w-4 h-4 text-slate-400" />
              {t('education.certificationsLabel')}
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {CERTIFICATIONS.map((cert, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg p-3 border border-slate-200"
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <Award className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <h4 className="text-sm font-medium text-slate-700">{cert.name}</h4>
                  </div>
                  {cert.note && (
                    <p className="text-xs text-slate-400 mt-1">{cert.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

