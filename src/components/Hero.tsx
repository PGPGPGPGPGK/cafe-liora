import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Photo from './Photo';
import { assets } from '../data/assets';
import { site } from '../data/site';

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero({ ready }: { ready: boolean }) {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Photo
          asset={assets.courtyard01}
          priority
          sizes="100vw"
          objectPosition="center 45%"
          className="scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-charcoal/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/55 via-charcoal/10 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-20 pt-28 sm:px-8 sm:pb-28">
        <motion.p
          className="eyebrow text-ivory/75"
          variants={rise}
          custom={0.1}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
        >
          Nagole · Hyderabad
        </motion.p>

        <motion.h1
          className="mt-5 max-w-3xl font-serif text-[clamp(2.75rem,10vw,6rem)] leading-[0.95] text-ivory"
          variants={rise}
          custom={0.22}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
        >
          {site.tagline}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-lg text-base leading-relaxed text-ivory/85 sm:text-lg"
          variants={rise}
          custom={0.34}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
        >
          {site.subheading}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          variants={rise}
          custom={0.46}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
        >
          <a
            href="#eat-sip"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-ivory px-7 py-4 text-sm font-medium text-espresso transition-colors hover:bg-caramel hover:text-ivory"
          >
            Explore the café
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#pickleball"
            className="inline-flex items-center justify-center rounded-full border border-ivory/55 px-7 py-4 text-sm font-medium text-ivory transition-colors hover:border-ivory hover:bg-ivory/10"
          >
            Book a court
          </a>
        </motion.div>
      </div>
    </section>
  );
}
