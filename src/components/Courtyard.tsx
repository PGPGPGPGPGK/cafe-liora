import Photo, { Placeholder } from './Photo';
import Reveal from './Reveal';
import { assets } from '../data/assets';

export default function Courtyard() {
  return (
    <section className="bg-ivory-light py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow text-caramel">The courtyard</p>
          <h2 className="mt-5 max-w-lg font-serif text-[clamp(2rem,6vw,3.25rem)] leading-[1.05] text-espresso">
            Cream walls, an arched door, and shade when you need it.
          </h2>
          <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-charcoal/75">
            Liora sits off Road No. 4 in Samathapuri Colony — canvas sails overhead, planting along
            the edges, lanterns on the walls. It is built for the long sit: a flat white in the
            morning, a bowl at noon, a game as the floodlights come on.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-espresso/15 pt-8 sm:max-w-sm">
            <div>
              <dt className="eyebrow text-espresso/50">Open</dt>
              <dd className="mt-2 font-serif text-2xl text-espresso">Till 11:30 pm</dd>
            </div>
            <div>
              <dt className="eyebrow text-espresso/50">Courts</dt>
              <dd className="mt-2 font-serif text-2xl text-espresso">Two, floodlit</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.12} className="grid grid-cols-5 gap-4">
          <div className="col-span-3 aspect-[3/4] overflow-hidden rounded-[2rem] rounded-tr-none">
            <Photo
              asset={assets.courtyard01}
              sizes="(min-width: 1024px) 30vw, 60vw"
              objectPosition="58% 40%"
            />
          </div>
          <div className="col-span-2 mt-12 aspect-[3/4] overflow-hidden rounded-[2rem] rounded-bl-none border border-dashed border-espresso/25">
            <Placeholder label={assets.courtyard02.description} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
