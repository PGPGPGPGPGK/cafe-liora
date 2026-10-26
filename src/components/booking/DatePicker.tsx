import { useMemo } from 'react';
import { getDays, toISODate } from '../../lib/availability';

const weekday = (d: Date) => d.toLocaleDateString('en-IN', { weekday: 'short' });
const month = (d: Date) => d.toLocaleDateString('en-IN', { month: 'short' });

export default function DatePicker({
  value,
  onSelect,
}: {
  value: string | null;
  onSelect: (iso: string) => void;
}) {
  // Read the clock once per mount, not on every render. The purity rule flags
  // any `new Date()` reached from render; here that is the point — the picker
  // has to know what "today" is.
  const { days, today } = useMemo(() => {
    // oxlint-disable-next-line purity
    const now = new Date();
    return { days: getDays(10, now), today: toISODate(now) };
  }, []);

  return (
    <div
      role="group"
      aria-label="Choose a date"
      className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-3 sm:mx-0 sm:flex-wrap sm:px-0"
    >
      {days.map((day) => {
        const iso = toISODate(day);
        const selected = value === iso;
        return (
          <button
            key={iso}
            type="button"
            onClick={() => onSelect(iso)}
            aria-pressed={selected}
            className={`min-h-[5rem] w-[4.25rem] shrink-0 rounded-2xl border px-2 py-3 text-center transition-colors ${
              selected
                ? 'border-espresso bg-espresso text-ivory'
                : 'border-espresso/20 bg-ivory-light text-espresso hover:border-espresso/60'
            }`}
          >
            <span className={`block text-[0.6875rem] uppercase tracking-wider ${selected ? 'text-ivory/70' : 'text-charcoal/55'}`}>
              {iso === today ? 'Today' : weekday(day)}
            </span>
            <span className="mt-1.5 block font-serif text-2xl leading-none">{day.getDate()}</span>
            <span className={`mt-1 block text-[0.6875rem] ${selected ? 'text-ivory/70' : 'text-charcoal/55'}`}>
              {month(day)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
