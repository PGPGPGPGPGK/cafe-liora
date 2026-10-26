/**
 * Mock court availability for the booking prototype.
 *
 * This is the single boundary between the booking UI and its data. To go live,
 * replace the bodies of `getDays` / `getSlots` / `createBooking` with calls to a
 * real backend — the components only ever see these three functions and the
 * types below.
 */
export type Court = { id: 'court-1' | 'court-2'; name: string; surface: string };

export type Slot = {
  /** 24h start hour; every slot is exactly one hour. */
  hour: number;
  label: string;
  available: boolean;
};

export type Booking = {
  court: Court;
  date: string; // YYYY-MM-DD
  slot: Slot;
};

export const courts: Court[] = [
  { id: 'court-1', name: 'Court 1', surface: 'Outdoor · floodlit' },
  { id: 'court-2', name: 'Court 2', surface: 'Outdoor · floodlit' },
];

const OPEN_HOUR = 11;
const CLOSE_HOUR = 23; // last one-hour slot starts at 22:00

export const toISODate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** Long-form date for summaries, e.g. "Tuesday, 27 October". */
export const prettyDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

/** The next `count` bookable days, starting today. */
export function getDays(count = 10, from = new Date()): Date[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(from);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + i);
    return d;
  });
}

const hourLabel = (h: number) => {
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:00 ${suffix}`;
};

/** Stable pseudo-random so a slot does not flip state between renders. */
const seeded = (courtId: string, date: string, hour: number) => {
  const key = `${courtId}|${date}|${hour}`;
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 100) / 100;
};

export function getSlots(courtId: string, date: string, now = new Date()): Slot[] {
  const isToday = date === toISODate(now);
  return Array.from({ length: CLOSE_HOUR - OPEN_HOUR }, (_, i) => {
    const hour = OPEN_HOUR + i;
    const past = isToday && hour <= now.getHours();
    // Evenings fill up first, as they do in real life.
    const busyBias = hour >= 18 ? 0.45 : 0.2;
    return {
      hour,
      label: `${hourLabel(hour)} – ${hourLabel(hour + 1)}`,
      available: !past && seeded(courtId, date, hour) > busyBias,
    };
  });
}

/** Demo only: resolves without creating anything anywhere. */
export async function createBooking(booking: Booking): Promise<{ demo: true; booking: Booking }> {
  return { demo: true, booking };
}
