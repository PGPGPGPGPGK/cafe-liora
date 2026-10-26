import { Pencil } from 'lucide-react';
import { prettyDate, type Court, type Slot } from '../../lib/availability';

type Props = {
  court: Court | null;
  date: string | null;
  slot: Slot | null;
  /** Omitted on the confirmation screen, where nothing is editable any more. */
  onEdit?: (step: 'court' | 'date' | 'slot') => void;
};

export default function BookingSummary({ court, date, slot, onEdit }: Props) {
  const rows = [
    { key: 'court' as const, label: 'Court', value: court?.name },
    { key: 'date' as const, label: 'Date', value: date ? prettyDate(date) : undefined },
    { key: 'slot' as const, label: 'Time', value: slot?.label },
    { key: null, label: 'Duration', value: '1 hour' },
    { key: null, label: 'Price', value: 'Pricing to be confirmed by venue' },
  ];

  return (
    <dl className="divide-y divide-espresso/12 rounded-2xl border border-espresso/15 bg-ivory-light">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-4 px-5 py-4">
          <dt className="eyebrow text-espresso/50">{row.label}</dt>
          <dd className="flex items-center gap-3 text-right">
            <span className="text-sm text-charcoal">{row.value ?? '—'}</span>
            {onEdit && row.key && (
              <button
                type="button"
                onClick={() => onEdit(row.key!)}
                className="rounded-full p-1.5 text-espresso/60 transition-colors hover:bg-espresso/10 hover:text-espresso"
                aria-label={`Change ${row.label.toLowerCase()}`}
              >
                <Pencil size={14} />
              </button>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
