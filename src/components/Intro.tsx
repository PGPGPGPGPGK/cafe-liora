import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const letters = ['L', 'I', 'O', 'R', 'A'];

/** The opening title card: the LIORA name settles, then the panel lifts away. */
export default function Intro({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) onDone();
  }, [reduce, onDone]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  if (reduce) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal"
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{ delay: 2.2, duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={onDone}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center">
        <div className="flex">
          {letters.map((letter, i) => (
            <motion.span
              key={letter}
              className="font-serif text-[clamp(3rem,16vw,7rem)] leading-none text-ivory"
              style={{ letterSpacing: '0.18em' }}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.13, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        <motion.span
          className="eyebrow mt-5 text-caramel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.25, duration: 0.8 }}
        >
          Sip slow. Play fast.
        </motion.span>
        <motion.div
          className="mt-7 h-px bg-caramel/60"
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ delay: 1.5, duration: 0.7, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}
