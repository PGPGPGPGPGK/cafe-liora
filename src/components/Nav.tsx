import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { nav, site } from '../data/site';
import ConceptBadge from './ConceptBadge';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? 'bg-ivory-light/95 backdrop-blur-sm shadow-[0_1px_0_rgba(106,62,40,0.12)]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <div className="flex items-center gap-2.5 sm:gap-4">
          <a
            href="#top"
            className={`-ml-2 py-2 pl-2 pr-1 font-serif text-xl tracking-[0.3em] transition-colors sm:text-2xl ${
              scrolled || open ? 'text-espresso' : 'text-ivory'
            }`}
          >
            LIORA
          </a>
          <ConceptBadge dark={scrolled || open} />
        </div>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-sm font-light transition-colors hover:text-caramel ${
                scrolled ? 'text-charcoal' : 'text-ivory'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#pickleball"
            className="rounded-full bg-espresso px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-charcoal"
          >
            Book a court
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className={`-mr-2 p-2 md:hidden ${scrolled || open ? 'text-espresso' : 'text-ivory'}`}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Primary mobile"
        hidden={!open}
        className="border-t border-espresso/10 bg-ivory-light px-5 pb-6 pt-2 md:hidden"
      >
        {nav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setOpen(false)}
            className="block border-b border-espresso/10 py-4 font-serif text-2xl text-espresso"
          >
            {item.label}
          </a>
        ))}
        <a
          href="#pickleball"
          onClick={() => setOpen(false)}
          className="mt-5 block rounded-full bg-espresso px-5 py-3.5 text-center text-sm font-medium text-ivory"
        >
          Book a court
        </a>
        <a
          href={site.phoneHref}
          className="mt-3 block py-2 text-center text-sm font-light text-espresso/70"
        >
          {site.phone}
        </a>
      </nav>
    </header>
  );
}
