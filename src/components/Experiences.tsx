import Reveal from './Reveal';
import { experiences, pastHighlights } from '../data/experiences';

export default function Experiences() {
  return (
    <section id="experiences" className="bg-olive/12 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow text-olive">Experiences</p>
          <h2 className="mt-5 max-w-xl font-serif text-[clamp(2rem,6vw,3.25rem)] leading-[1.05] text-espresso">
            The courtyard rarely sits quiet.
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {experiences.map(({ id, icon: Icon, title, blurb }, i) => (
            <Reveal key={id} delay={0.06 * i}>
              <li className="border-t border-espresso/15 pt-6">
                <Icon size={22} className="text-olive" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-2xl text-espresso">{title}</h3>
                <p className="mt-2.5 max-w-sm text-[0.9375rem] font-light leading-relaxed text-charcoal/70">
                  {blurb}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="mt-16 rounded-3xl border border-espresso/15 bg-ivory-light p-6 sm:p-8">
            <h3 className="eyebrow text-espresso/55">Previously at Liora</h3>
            <ul className="mt-5 divide-y divide-espresso/10">
              {pastHighlights.map((h) => (
                <li key={h.id} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5">
                  <span className="font-serif text-lg text-espresso">{h.title}</span>
                  <span className="text-xs font-light tracking-wide text-charcoal/55">{h.when}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs font-light text-charcoal/55">
              A record of past evenings, not a calendar. Follow the café on Instagram for what is
              coming next.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
