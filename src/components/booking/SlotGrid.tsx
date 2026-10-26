import { getSlots, type Slot } from '../../lib/availability';

export default function SlotGrid({
  courtId,
  date,
  value,
  onSelect,
}: {
  courtId: string;
  date: string;
  value: Slot | null;
  onSelect: (slot: Slot) => void;
}) {
  const slots = getSlots(courtId, date);
  const anyOpen = slots.some((s) => s.available);

  return (
    <div>
      <div role="group" aria-label="Choose a one-hour slot" className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {slots.map((slot) => {
          const selected = value?.hour === slot.hour;
          return (
            <button
              key={slot.hour}
              type="button"
              disabled={!slot.available}
              aria-pressed={selected}
              onClick={() => onSelect(slot)}
              className={`min-h-[3.25rem] rounded-xl border px-3 text-[0.8125rem] transition-colors ${
                selected
                  ? 'border-espresso bg-espresso text-ivory'
                  : slot.available
                    ? 'border-espresso/20 bg-ivory-light text-espresso hover:border-espresso/60'
                    : 'cursor-not-allowed border-transparent bg-espresso/[0.06] text-espresso/35 line-through'
              }`}
            >
              {slot.label}
            </button>
          );
        })}
      </div>

      {!anyOpen && (
        <p className="mt-5 text-sm font-light text-espresso/70">
          Nothing open on this date in the demo data — try another day.
        </p>
      )}

      <Legend />
    </div>
  );
}

function Legend() {
  return (
    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-light text-charcoal/60">
      <li className="flex items-center gap-2">
        <span className="h-3 w-3 rounded border border-espresso/30 bg-ivory-light" aria-hidden="true" />
        Available
      </li>
      <li className="flex items-center gap-2">
        <span className="h-3 w-3 rounded bg-espresso" aria-hidden="true" />
        Selected
      </li>
      <li className="flex items-center gap-2">
        <span className="h-3 w-3 rounded bg-espresso/[0.12]" aria-hidden="true" />
        Unavailable
      </li>
    </ul>
  );
}
