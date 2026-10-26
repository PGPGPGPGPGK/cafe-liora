import { Check } from 'lucide-react';
import { courts, type Court } from '../../lib/availability';

export default function CourtPicker({
  value,
  onSelect,
}: {
  value: Court | null;
  onSelect: (court: Court) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
      {courts.map((court) => {
        const selected = value?.id === court.id;
        return (
          <button
            key={court.id}
            type="button"
            onClick={() => onSelect(court)}
            aria-pressed={selected}
            className={`flex min-h-[5.5rem] items-center justify-between rounded-2xl border p-5 text-left transition-colors ${
              selected
                ? 'border-espresso bg-espresso text-ivory'
                : 'border-espresso/20 bg-ivory-light text-espresso hover:border-espresso/60'
            }`}
          >
            <span>
              <span className="block font-serif text-2xl leading-none">{court.name}</span>
              <span
                className={`mt-2 block text-xs font-light ${selected ? 'text-ivory/70' : 'text-charcoal/60'}`}
              >
                {court.surface}
              </span>
            </span>
            {selected && <Check size={20} aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
}
