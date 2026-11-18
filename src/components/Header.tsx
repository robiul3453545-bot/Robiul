import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 border-b border-[#dde6f2] bg-white/95 backdrop-blur-sm dark:border-[#233468] dark:bg-[#0a1330]/95">
      <div className="mx-auto flex h-[74px] max-w-[1140px] items-center justify-between gap-8 px-6">
        <a
          href="#home"
          className="flex shrink-0 items-center gap-3 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f8701a]"
        >
          {!logoError && (
            <img
              src={t.brand.iconPath}
              alt="Robiconic Digital"
              referrerPolicy="no-referrer"
              onError={() => setLogoError(true)}
              className="h-10 w-auto shrink-0 object-contain"
            />
          )}
          <span className="font-display text-xl font-extrabold tracking-tight whitespace-nowrap">
            <span className="text-[#1a3c8e] dark:text-white">{t.brand.prefix}</span>
            <span className="text-[#f8701a]">{t.brand.highlight}</span>{' '}
            <span className="text-[#0c77bb] dark:text-[#1ea5e8]">{t.brand.suffix}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {t.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 whitespace-nowrap border-b-2 border-transparent py-1 text-[15px] font-medium text-[#58637f] transition-colors duration-150 hover:border-[#f8701a] hover:text-[#14213f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f8701a] dark:text-[#a6b3d6] dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#dde6f2] bg-[#f8fafc] px-3 text-xs font-bold text-[#14213f] shadow-sm transition-all hover:border-[#f8701a] hover:text-[#f8701a] dark:border-[#233468] dark:bg-[#132050] dark:text-white"
            title="ভাষা পরিবর্তন করুন / Switch Language"
            aria-label="Toggle language"
          >
            <Globe className="h-3.5 w-3.5 text-[#0c77bb] dark:text-[#1ea5e8]" />
            <span className={language === 'bn' ? 'font-extrabold text-[#f8701a]' : 'opacity-60'}>বাংলা</span>
            <span className="opacity-30">/</span>
            <span className={language === 'en' ? 'font-extrabold text-[#f8701a]' : 'opacity-60'}>EN</span>
          </button>

          <a
            href="#contact"
            className="hidden shrink-0 whitespace-nowrap rounded-lg bg-[#f8701a] px-5 py-2.5 font-display text-[15px] font-bold tracking-wide text-white transition-colors duration-150 hover:bg-[#e25f0c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8701a] md:inline-block"
          >
            {t.hero.navCta}
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#14213f] transition-colors hover:bg-[#f2f7fc] focus-visible:outline-2 focus-visible:outline-[#f8701a] md:hidden dark:text-white dark:hover:bg-[#132050]"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-[#dde6f2] bg-white px-6 py-4 md:hidden dark:border-[#233468] dark:bg-[#0a1330]">
          <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
            {t.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-2 text-base font-medium text-[#14213f] hover:text-[#f8701a] dark:text-[#eef3ff]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#f8701a] px-5 py-2.5 font-display text-base font-bold text-white hover:bg-[#e25f0c]"
            >
              {t.hero.navCta}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}