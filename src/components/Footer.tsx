import { Navigation, Phone } from 'lucide-react';
import Reveal from './Reveal';
import { InstagramGlyph, WhatsAppGlyph } from './BrandIcons';
import { site } from '../data/site';

const socials = [
  { icon: InstagramGlyph, label: `Instagram, ${site.instagramHandle}`, href: site.instagram },
  { icon: WhatsAppGlyph, label: 'WhatsApp the café', href: site.whatsapp },
];

export default function Footer() {
  return (
    <footer id="visit" className="bg-charcoal px-5 py-20 text-ivory sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow text-caramel">Visit us</p>
          <h2 className="mt-5 font-serif text-[clamp(2rem,6vw,3.25rem)] leading-[1.05]">
            Find us in Nagole.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <address className="not-italic">
              <p className="text-lg font-light leading-relaxed text-ivory/80">
                {site.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <a
                href={site.phoneHref}
                className="mt-5 inline-block font-serif text-2xl text-ivory underline-offset-4 hover:text-caramel hover:underline"
              >
                {site.phone}
              </a>
              <p className="mt-5 text-sm font-light text-ivory/55">
                Open daily till 11:30 pm. {site.bio}
              </p>
            </address>

            <div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={site.maps}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-full border border-ivory/30 px-6 text-sm font-medium text-ivory transition-colors hover:border-ivory hover:bg-ivory hover:text-charcoal"
                >
                  <Navigation size={16} aria-hidden="true" />
                  Get directions
                </a>
                <a
                  href={site.phoneHref}
                  className="inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-full border border-ivory/30 px-6 text-sm font-medium text-ivory transition-colors hover:border-ivory hover:bg-ivory hover:text-charcoal"
                >
                  <Phone size={16} aria-hidden="true" />
                  Call the café
                </a>

                <div className="flex gap-3">
                  {socials.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={label}
                      title={label}
                      className="inline-flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors hover:border-ivory hover:bg-ivory hover:text-charcoal"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>

              <a
                href="#pickleball"
                className="mt-6 inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-full bg-caramel px-7 text-sm font-medium text-charcoal transition-colors hover:bg-ivory sm:w-auto"
              >
                Book a court
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 border-t border-ivory/15 pt-8">
          <p className="font-serif text-3xl tracking-[0.3em]">LIORA</p>
          <p className="mt-2 text-sm font-light text-ivory/55">{site.tagline}</p>
          <p className="mt-6 max-w-2xl text-xs font-light leading-relaxed text-ivory/45">
            Concept preview. This is an independent design proposal for Cafe Liora and is not
            operated by, affiliated with or endorsed by the café. The court booking flow is a
            demonstration only — no reservations are created and no payments are collected.
            Photographs are Cafe Liora's own.
          </p>
        </div>
      </div>
    </footer>
  );
}
