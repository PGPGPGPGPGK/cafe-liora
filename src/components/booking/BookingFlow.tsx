import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, CalendarCheck, RotateCcw } from 'lucide-react';
import CourtPicker from './CourtPicker';
import DatePicker from './DatePicker';
import SlotGrid from './SlotGrid';
import BookingSummary from './BookingSummary';
import { createBooking, prettyDate, type Court, type Slot } from '../../lib/availability';

const steps = ['court', 'date', 'slot', 'review', 'done'] as const;
type Step = (typeof steps)[number];

const headings: Record<Step, { title: string; hint: string }> = {
  court: { title: 'Choose your court', hint: 'Two floodlit courts, booked by the hour.' },
  date: { title: 'Choose a date', hint: 'Availability shown is demo data, not a live diary.' },
  slot: { title: 'Choose a one-hour slot', hint: 'Every booking runs for exactly one hour.' },
  review: { title: 'Review your booking', hint: 'Check the details — nothing is reserved yet.' },
  done: { title: 'Demo complete', hint: '' },
};

export default function BookingFlow() {
  const [step, setStep] = useState<Step>('court');
  const [court, setCourt] = useState<Court | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);

  const index = steps.indexOf(step);
  const cardRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // On a narrow screen the card sits well down the section; keep the active
  // step in view as the flow advances instead of leaving the user scrolled away.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = cardRef.current;
    if (!el) return;
    const { top } = el.getBoundingClientRect();
    if (top < 56 || top > window.innerHeight - 160) {
      el.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, [step]);

  const goBack = () => setStep(steps[Math.max(0, index - 1)]);

  const confirm = async () => {
    if (!court || !date || !slot) return;
    await createBooking({ court, date, slot }); // demo: resolves without side effects
    setStep('done');
  };

  const restart = () => {
    setCourt(null);
    setDate(null);
    setSlot(null);
    setStep('court');
  };

  return (
    <div ref={cardRef} className="scroll-mt-20 rounded-3xl border border-espresso/15 bg-ivory p-5 sm:min-h-[30rem] sm:p-8">
      <div className="flex items-center justify-between gap-4">
        {step !== 'court' && step !== 'done' ? (
          <button
            type="button"
            onClick={goBack}
            className="-ml-2 inline-flex items-center gap-2 rounded-full px-2 py-2 text-sm font-light text-espresso transition-colors hover:text-caramel"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back
          </button>
        ) : (
          <span />
        )}
        {step !== 'done' && (
          <ol className="flex items-center gap-1.5" aria-label={`Step ${index + 1} of 4`}>
            {steps.slice(0, 4).map((s, i) => (
              <li
                key={s}
                aria-current={s === step ? 'step' : undefined}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-7 bg-espresso' : i < index ? 'w-4 bg-caramel' : 'w-4 bg-espresso/20'
                }`}
              />
            ))}
          </ol>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          <h3 className="font-serif text-2xl text-espresso sm:text-3xl">{headings[step].title}</h3>
          {headings[step].hint && (
            <p className="mt-2 text-sm font-light text-charcoal/65">{headings[step].hint}</p>
          )}

          <div className="mt-7">
            {step === 'court' && (
              <CourtPicker
                value={court}
                onSelect={(c) => {
                  setCourt(c);
                  setSlot(null);
                  setStep('date');
                }}
              />
            )}

            {step === 'date' && (
              <DatePicker
                value={date}
                onSelect={(iso) => {
                  setDate(iso);
                  setSlot(null);
                  setStep('slot');
                }}
              />
            )}

            {step === 'slot' && court && date && (
              <>
                <p className="mb-5 text-sm font-light text-charcoal/70">
                  {court.name} · {prettyDate(date)}
                </p>
                <SlotGrid
                  courtId={court.id}
                  date={date}
                  value={slot}
                  onSelect={(s) => {
                    setSlot(s);
                    setStep('review');
                  }}
                />
              </>
            )}

            {step === 'review' && (
              <>
                <BookingSummary court={court} date={date} slot={slot} onEdit={(s) => setStep(s)} />
                <button
                  type="button"
                  onClick={confirm}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-7 py-4 text-sm font-medium text-ivory transition-colors hover:bg-charcoal sm:w-auto"
                >
                  <CalendarCheck size={16} aria-hidden="true" />
                  Confirm booking (demo)
                </button>
                <p className="mt-4 text-xs font-light text-espresso/60">
                  No payment is taken and no reservation is created. Pricing to be confirmed by venue.
                </p>
              </>
            )}

            {step === 'done' && (
              <div role="status">
                <p className="text-base text-charcoal">
                  Demo complete — no reservation has been made.
                </p>
                <div className="mt-6">
                  <BookingSummary court={court} date={date} slot={slot} />
                </div>
                <button
                  type="button"
                  onClick={restart}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-espresso/30 px-7 py-4 text-sm font-medium text-espresso transition-colors hover:border-espresso"
                >
                  <RotateCcw size={16} aria-hidden="true" />
                  Run the flow again
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
