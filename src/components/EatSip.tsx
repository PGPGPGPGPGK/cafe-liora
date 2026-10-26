import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Expand, X } from 'lucide-react';
import Photo, { Placeholder } from './Photo';
import Reveal from './Reveal';
import { assets, type AssetId } from '../data/assets';
import { categories, menu, type MenuCategory } from '../data/menu';

export default function EatSip() {
  const [active, setActive] = useState<MenuCategory>('coffee');
  const [lightbox, setLightbox] = useState<AssetId | null>(null);

  const items = useMemo(() => menu.filter((m) => m.category === active), [active]);
  const featured = items.filter((i) => i.image);
  const category = categories.find((c) => c.id === active)!;

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLightbox(null);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  return (
    <section id="eat-sip" className="bg-ivory py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow text-caramel">Eat &amp; Sip</p>
          <h2 className="mt-5 max-w-xl font-serif text-[clamp(2rem,6vw,3.25rem)] leading-[1.05] text-espresso">
            From bean into every perfect brew.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            role="tablist"
            aria-label="Menu categories"
            className="mt-10 -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={active === c.id}
                aria-controls="menu-panel"
                onClick={() => setActive(c.id)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm transition-colors ${
                  active === c.id
                    ? 'border-espresso bg-espresso text-ivory'
                    : 'border-espresso/25 text-espresso hover:border-espresso/60'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14"
            >
              {/* Photography, when Liora has supplied it for this category. */}
              <div className={featured.length > 1 ? 'grid grid-cols-2 gap-4' : ''}>
                {featured.length > 0 ? (
                  featured.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLightbox(item.image!)}
                      aria-label={`View photograph of ${item.name}`}
                      className="group relative block w-full overflow-hidden rounded-[1.75rem] bg-ivory-light"
                    >
                      <div className={featured.length > 1 ? 'aspect-[3/4]' : 'aspect-[4/3]'}>
                        <Photo
                          asset={assets[item.image!]}
                          sizes="(min-width: 1024px) 40vw, 90vw"
                          className="transition-transform duration-[900ms] group-hover:scale-[1.04]"
                        />
                      </div>
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-charcoal/80 to-transparent p-5 text-left">
                        <span className="font-serif text-xl text-ivory sm:text-2xl">{item.name}</span>
                        <Expand size={16} className="mb-1.5 shrink-0 text-ivory/70" aria-hidden="true" />
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-dashed border-espresso/25">
                    <Placeholder label={category.label} />
                  </div>
                )}
              </div>

              <div>
                <p className="max-w-md text-[0.95rem] leading-relaxed text-charcoal/70">
                  {category.blurb}
                </p>
                <ul className="mt-8 divide-y divide-espresso/12 border-t border-espresso/12">
                  {items.map((item) => (
                    <li key={item.id} className="py-4">
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-serif text-xl text-espresso">{item.name}</h3>
                        {item.image && (
                          <button
                            type="button"
                            onClick={() => setLightbox(item.image!)}
                            className="shrink-0 py-1 text-[0.6875rem] uppercase tracking-[0.18em] text-caramel transition-colors hover:text-espresso"
                          >
                            View photo
                          </button>
                        )}
                      </div>
                      <p className="mt-1 text-[0.875rem] font-light leading-snug text-charcoal/65">
                        {item.note}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="mt-7 text-xs font-light tracking-wide text-espresso/55">
                  Prices are on the café's own menu — ask in the courtyard or call ahead.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/92 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={assets[lightbox].description}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close photograph"
              className="absolute right-5 top-5 rounded-full border border-ivory/30 p-3 text-ivory"
              autoFocus
            >
              <X size={18} />
            </button>
            <motion.figure
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex max-h-[72svh] justify-center overflow-hidden rounded-2xl">
                <Photo
                  asset={assets[lightbox]}
                  sizes="(min-width: 768px) 42rem, 90vw"
                  fit="contain"
                  className="max-h-[72svh]"
                />
              </div>
              <figcaption className="mt-4 text-center text-sm font-light text-ivory/75">
                {assets[lightbox].description}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
