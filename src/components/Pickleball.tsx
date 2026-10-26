import { Clock, Info, MapPin } from 'lucide-react';
import BookingFlow from './booking/BookingFlow';
import Reveal from './Reveal';

const facts = [
  { icon: MapPin, text: 'Two courts, both outdoor and floodlit' },
  { icon: Clock, text: 'One-hour slots, 11:00 am to 11:00 pm' },
  { icon: Info, text: 'Pricing to be confirmed by venue' },
];

export default function Pickleball() {
  return (
    <section id="pickleball" className="bg-charcoal py-20 text-ivory sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow text-caramel">Pickleball</p>
          <h2 className="mt-5 font-serif text-[clamp(2rem,6vw,3.25rem)] leading-[1.05]">
            Play fast, then sit a while.
          </h2>
          <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-ivory/70">
            Grab the court for an hour, settle the score, and bring it back to the courtyard for
            coffee. Below is a working prototype of how booking a court could feel.
          </p>

          <ul className="mt-10 space-y-4">
            {facts.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm font-light text-ivory/80">
                <Icon size={17} className="mt-0.5 shrink-0 text-caramel" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-md rounded-2xl border border-ivory/15 p-5 text-xs font-light leading-relaxed text-ivory/60">
            This booking flow is a demonstration built for a concept presentation. Availability is
            mock data, no reservation is created and no payment is collected. To call a court, phone
            the café.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="text-charcoal">
            <BookingFlow />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
