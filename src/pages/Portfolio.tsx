import React, { useState, useEffect } from 'react';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Experience from '@/components/portfolio/Experience';
import Education from '@/components/portfolio/Education';
import GeminiChat from '@/components/portfolio/GeminiChat';
import Footer from '@/components/portfolio/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BlueberryLogo from '@/components/ui/blueberry-logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserAvatar } from '@/components/fintech/UserAvatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

const PortfolioContent: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('nav.about'), href: '#om-mig' },
    { label: t('nav.philosophy'), href: '#filosofi' },
    { label: t('nav.experience'), href: '#erfarenhet' },
    { label: t('nav.education'), href: '#utbildning' },
    { label: t('nav.contribution'), href: '#bidrag' },
    { label: t('nav.aiChat'), href: '#ai-chat' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
      {/* Header - Same structure as Dashboard */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-popover/90 backdrop-blur-md text-foreground shadow-lg' 
            : 'bg-transparent text-white'
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between max-w-full">
            {/* Left side - Logo/Brand */}
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {/* Hamburger menu - shown when desktop nav is hidden (below lg breakpoint) */}
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="h-8 w-8 p-0 hover:bg-accent/10"
                  aria-label="Toggle navigation menu"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </div>
              {/* Logo - shown when desktop nav is visible (above lg breakpoint) */}
              <div className="hidden lg:block">
                <Link to="/">
                  <BlueberryLogo size="sm" />
                </Link>
              </div>
              <Link to="/" className="hover:opacity-80 transition-opacity">
                <h1 className={`text-lg sm:text-2xl lg:text-3xl font-extrabold truncate ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}>
                  <span className="lg:hidden">MB</span>
                  <span className="hidden lg:inline">Marcus Björke</span>
                </h1>
              </Link>
            </div>
            
            {/* Right side - Actions */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-3 xl:space-x-4 mr-2">
                {navItems.map((item) => (
                  <a 
                    key={item.href} 
                    href={item.href}
                    className={`text-xs xl:text-sm font-medium hover:text-indigo-500 transition-colors whitespace-nowrap ${
                      isScrolled ? 'text-foreground/70' : 'text-white/90'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                <Link 
                  to="/dashboard"
                  className={`text-xs xl:text-sm font-medium hover:text-indigo-500 transition-colors whitespace-nowrap ${
                    isScrolled ? 'text-foreground/70' : 'text-white/90'
                  }`}
                >
                  Dashboard
                </Link>
              </div>
              
              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === 'sv' ? 'en' : 'sv')}
                className={`${isScrolled ? 'text-foreground/70' : 'text-white/90'} hover:text-indigo-500`}
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4 mr-1" />
                <span className="text-xs font-medium">{language.toUpperCase()}</span>
              </Button>
              
              <ThemeToggle data-testid="theme-toggle" />
              <UserAvatar 
                name="Marcus Björke" 
                email="marcus@blueberry.surf"
                imageUrl="/marcus.jpg"
                resumeUrl="https://mbjorke.cv"
              />
            </div>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-popover/95 backdrop-blur-md shadow-lg border-t border-border p-6 flex flex-col space-y-4 lg:hidden">
            {navItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href}
                className="text-foreground font-medium py-2 hover:text-indigo-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link 
              to="/dashboard"
              className="text-foreground font-medium py-2 hover:text-indigo-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Hero />
        <About />
        <Experience />
        <GeminiChat />
        <Education />
      </main>

      <Footer />
    </div>
  );
};

const Portfolio: React.FC = () => {
  return (
    <LanguageProvider>
      <PortfolioContent />
    </LanguageProvider>
  );
};

export default Portfolio;

