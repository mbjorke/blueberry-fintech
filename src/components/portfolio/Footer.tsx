import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t('footer.company')}</h3>
            <p className="text-sm mb-2">{t('footer.businessId')}</p>
            <p className="text-sm mb-2">{t('footer.euid')}</p>
            <p className="text-sm mb-4">
              {t('footer.address')}
            </p>
            <a
              href="https://blueberry.build"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              blueberry.build
            </a>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://uxdb.org/policies?tab=privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-indigo-400 transition-colors"
                >
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a
                  href="https://uxdb.org/policies?tab=terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-indigo-400 transition-colors"
                >
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <a
                  href="https://uxdb.org/policies?tab=compliance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-indigo-400 transition-colors"
                >
                  {t('footer.compliance')}
                </a>
              </li>
              <li>
                <a
                  href="https://uxdb.org/policies?tab=data-sources"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-indigo-400 transition-colors"
                >
                  {t('footer.dataSources')}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-indigo-400 transition-colors">
                  {t('footer.portfolio')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm hover:text-indigo-400 transition-colors">
                  {t('footer.dashboard')}
                </Link>
              </li>
              <li>
                <a
                  href="https://mbjorke.cv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-indigo-400 transition-colors"
                >
                  {t('footer.cv')}
                </a>
              </li>
              <li>
                <a
                  href="https://uxdb.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-indigo-400 transition-colors"
                >
                  {t('footer.uxdb')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:marcus@blueberry.surf"
                  className="hover:text-indigo-400 transition-colors"
                >
                  marcus@blueberry.surf
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/mbjorke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-60">
            &copy; {currentYear} {t('footer.company')}. {t('footer.copyright')}
          </p>
          <p className="text-sm opacity-60">
            {t('footer.builtBy')}{' '}
            <a
              href="https://blueberry.build"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300"
            >
              {t('footer.company')}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

