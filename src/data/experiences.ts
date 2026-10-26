import { Music, Palette, Sparkles, Users } from 'lucide-react';

/** What regularly happens at Liora. Not a calendar — nothing here is advertised as upcoming. */
export const experiences = [
  {
    id: 'live-music',
    icon: Music,
    title: 'Live Music',
    blurb:
      'Acoustic sets in the courtyard after sundown, with the sound bouncing softly off the cream walls.',
  },
  {
    id: 'workshops',
    icon: Palette,
    title: 'Art Workshops',
    blurb:
      'Hands-on afternoons — clay, craft and seasonal making sessions run with Hyderabad workshop collectives.',
  },
  {
    id: 'cafe-events',
    icon: Sparkles,
    title: 'Café Events',
    blurb:
      'Menu launches, festival specials and the odd new chapter announced over a full house.',
  },
  {
    id: 'social',
    icon: Users,
    title: 'Social Gatherings',
    blurb:
      'Birthdays, team evenings and long tables for two — the courtyard takes a crowd comfortably.',
  },
] as const;

/**
 * Drawn from Cafe Liora's public Instagram. Shown strictly as history so that
 * nothing past is mistaken for an upcoming event.
 */
export const pastHighlights = [
  { id: 'bhuvan-rishab', title: 'Live Music — Bhuvan & Rishab', when: 'Saturday 5 September' },
  { id: 'ganesh', title: 'Eco-Friendly Ganesh Idol Making Workshop', when: 'Saturday 30 August' },
  { id: 'raksha', title: 'Raksha Bandhan at Liora', when: 'August' },
  { id: 'dimsums', title: 'New Chapter — Dimsums on the menu', when: 'Menu launch' },
] as const;
