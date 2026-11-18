import { useEffect, useState } from 'react';
import { Moon, Search, Share2, Sun, Target, TrendingUp } from 'lucide-react';
import { Header } from './components/Header';
import { HeroIllustration } from './components/HeroIllustration';
import { StatsBand } from './components/StatsBand';
import { ContactSection } from './components/ContactSection';
import { AIChatAssistant } from './components/AIChatAssistant';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { type ServiceItem } from './data/siteData';

function ServiceIcon({ name, color }: { name: ServiceItem['iconName']; color: string }) {
  const props = { className: 'h-5 w-5', style: { color } };
  switch (name) {
    case 'search':
      return <Search {...props} />;
    case 'trending':
      return <TrendingUp {...props} />;
    case 'share':
      return <Share2 {...props} />;
    case 'target':
      return <Target {...props} />;
  }
}

function MainLayout() {
  const { t } = useLanguage();
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [footerLogoError, setFooterLogoError] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-white text-[#14213f] antialiased dark:bg-[#0a1330] dark:text-[#eef3ff]">
      <Header />

      <main>
        {/* Hero */}
        <section
          id="home"
          className="bg-gradient-to-b from-[#f2f7fc] to-white py-16 sm:py-20 dark:from-[#0f1a40] dark:to-[#0a1330]"
        >
          <div className="mx-auto grid max-w-[1140px] items-center gap-12 px-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold tracking-wide text-[#0c77bb] dark:text-[#1ea5e8]">
                {t.hero.kicker}
              </p>
              <h1 className="mt-3 max-w-2xl font-display text-[clamp(2.4rem,5.2vw,4.1rem)] font-extrabold leading-[1.06] tracking-tight text-[#1a3c8e] [text-wrap:balance] dark:text-white">
                {t.hero.headlineStart}
                <span className="text-[#f8701a]">{t.hero.headlineAccent}</span>
                {t.hero.headlineEnd}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#58637f] dark:text-[#a6b3d6]">
                {t.hero.lead}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex min-h-[46px] items-center justify-center rounded-lg bg-[#f8701a] px-7 py-3 font-display text-base font-bold tracking-wide text-white transition-colors duration-150 hover:bg-[#e25f0c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8701a]"
                >
                  {t.hero.primaryCta}
                </a>
                <a
                  href="#services"
                  className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-[#1a3c8e] px-6 py-3 font-display text-base font-bold tracking-wide text-[#1a3c8e] transition-colors duration-150 hover:bg-[#1a3c8e] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8701a] dark:border-white/70 dark:text-white dark:hover:bg-white dark:hover:text-[#0a1330]"
                >
                  {t.hero.secondaryCta}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <HeroIllustration />
            </div>
          </div>
        </section>

        <StatsBand />

        {/* Services */}
        <section id="services" className="py-20">
          <div className="mx-auto max-w-[1140px] px-6">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#1a3c8e] sm:text-4xl dark:text-white">
                {t.servicesTitle}
              </h2>
              <p className="mt-3 text-base text-[#58637f] dark:text-[#a6b3d6]">{t.servicesIntro}</p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {t.services.map((service) => (
                <article
                  key={service.id}
                  className="flex flex-col justify-between rounded-xl border border-[#dde6f2] border-t-4 bg-white p-6 transition-transform duration-150 hover:-translate-y-0.5 dark:border-[#233468] dark:bg-[#132050]"
                  style={{ borderTopColor: service.accentColor }}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-extrabold tracking-wider text-[#58637f] dark:text-[#a6b3d6]">
                        {service.number}
                      </span>
                      <span
                        className="grid h-10 w-10 place-items-center rounded-lg bg-[#f2f7fc] dark:bg-[#0f1a40]"
                        aria-hidden="true"
                      >
                        <ServiceIcon name={service.iconName} color={service.accentColor} />
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-xl font-bold text-[#14213f] dark:text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-[#58637f] dark:text-[#a6b3d6]">
                      {service.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Work / Results */}
        <section id="work" className="border-t border-[#dde6f2] bg-[#f8fafc] py-20 dark:border-[#233468] dark:bg-[#0c1638]">
          <div className="mx-auto max-w-[1140px] px-6">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#1a3c8e] sm:text-4xl dark:text-white">
                {t.workTitle}
              </h2>
              <p className="mt-3 text-base text-[#58637f] dark:text-[#a6b3d6]">{t.workIntro}</p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {t.work.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-[#dde6f2] bg-white dark:border-[#233468] dark:bg-[#132050]"
                >
                  <div className="flex h-36 items-end justify-between border-b border-[#dde6f2] bg-[#f2f7fc] px-6 pt-5 pb-0 dark:border-[#233468] dark:bg-[#0f1a40]">
                    <div className="flex items-end gap-2.5">
                      <span
                        className="block w-8 rounded-t bg-[#0c77bb]"
                        style={{ height: `${item.bars[0]}px` }}
                      />
                      <span
                        className="block w-8 rounded-t bg-[#f8701a]"
                        style={{ height: `${item.bars[1]}px` }}
                      />
                      <span
                        className="block w-8 rounded-t bg-[#1a3c8e] dark:bg-[#1ea5e8]"
                        style={{ height: `${item.bars[2]}px` }}
                      />
                    </div>
                    <span className="self-start text-xs font-semibold tracking-wide text-[#58637f] dark:text-[#a6b3d6]">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold text-[#0c77bb] tabular-nums dark:text-[#1ea5e8]">
                      {item.metric}
                    </p>
                    <h3 className="mt-1.5 font-display text-xl font-bold text-[#14213f] dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#58637f] dark:text-[#a6b3d6]">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="py-20">
          <div className="mx-auto max-w-[1140px] px-6">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#1a3c8e] sm:text-4xl dark:text-white">
                {t.processTitle}
              </h2>
              <p className="mt-3 text-base text-[#58637f] dark:text-[#a6b3d6]">{t.processIntro}</p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {t.steps.map((step, index) => (
                <div key={step.number} className="relative">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-lg font-extrabold text-white tabular-nums ${
                        index % 2 === 1 ? 'bg-[#f8701a]' : 'bg-[#1a3c8e]'
                      }`}
                    >
                      {step.number}
                    </span>
                    {index < t.steps.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="hidden h-px flex-1 bg-[#dde6f2] lg:block dark:bg-[#233468]"
                      />
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-[#14213f] dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-[#58637f] dark:text-[#a6b3d6]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <footer className="bg-[#0f2257] py-8 text-sm text-[#a9b8e4]">
        <div className="mx-auto flex max-w-[1140px] flex-wrap items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-3">
            {!footerLogoError && (
              <img
                src={t.brand.iconPath}
                alt="Robiconic Digital logo"
                referrerPolicy="no-referrer"
                onError={() => setFooterLogoError(true)}
                className="h-9 w-auto rounded-md bg-white p-1"
              />
            )}
            <span>© {new Date().getFullYear()} Robiconic Digital. {t.footer.rights}</span>
          </div>

          <button
            type="button"
            onClick={() => setDark((prev) => !prev)}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/15 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#f8701a]"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span>{dark ? t.footer.lightTheme : t.footer.darkTheme}</span>
          </button>
        </div>
      </footer>
      <AIChatAssistant />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainLayout />
    </LanguageProvider>
  );
}