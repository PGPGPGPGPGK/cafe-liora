import type { AssetId } from './assets';

/**
 * Dishes and drinks confirmed from Cafe Liora's own Instagram and the supplied
 * photographs. No prices are listed here on purpose — the café's menu is the
 * only source for those.
 */
export type MenuCategory = 'coffee' | 'cold' | 'mains' | 'small';

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  note: string;
  /** Photograph, when Liora has supplied one. */
  image?: AssetId;
};

export const categories: { id: MenuCategory; label: string; blurb: string }[] = [
  {
    id: 'coffee',
    label: 'Coffee',
    blurb: 'Pulled from premium beans, poured slow, served under the shade sails.',
  },
  {
    id: 'cold',
    label: 'Cold & Sweet',
    blurb: 'Shakes and mocktails built for a Hyderabad afternoon.',
  },
  {
    id: 'mains',
    label: 'Plates',
    blurb: 'Bowls, wraps and burgers that hold up to a two-hour table.',
  },
  {
    id: 'small',
    label: 'Small Plates',
    blurb: 'Soups, salads and things to share between games.',
  },
];

export const menu: MenuItem[] = [
  {
    id: 'latte',
    name: 'Latte',
    category: 'coffee',
    note: 'Rosetta poured by hand.',
    image: 'coffeeLatte',
  },
  { id: 'hot-americano', name: 'Hot Americano', category: 'coffee', note: 'Bold, clean, unhurried.' },
  { id: 'iced-americano', name: 'Iced Americano', category: 'coffee', note: 'Over ice, with a slow swirl of milk.' },
  { id: 'matcha', name: 'Matcha', category: 'coffee', note: 'Iced, layered, ceremonial grade.' },
  {
    id: 'biscoff-shake',
    name: 'Lotus Biscoff Shake',
    category: 'cold',
    note: 'Thick, spiced, crowned with the biscuit.',
    image: 'biscoffShake',
  },
  {
    id: 'watermelon-mocktail',
    name: 'Watermelon Mocktail',
    category: 'cold',
    note: 'Fresh pressed, long and cold.',
    image: 'watermelonMocktail',
  },
  { id: 'signature-mocktails', name: 'Signature Mocktails', category: 'cold', note: 'Seasonal pours from the bar.' },
  {
    id: 'grilled-chicken-ramen',
    name: 'Grilled Chicken Ramen Bowl',
    category: 'mains',
    note: 'Broth, jammy egg, greens, grilled chicken.',
  },
  { id: 'burgers', name: 'Burgers & Sliders', category: 'mains', note: 'Stacked, toasted, on the board.' },
  { id: 'pizza', name: 'Pizza', category: 'mains', note: 'Thin base, blistered edge.' },
  { id: 'southwest-wrap', name: 'Spicy Southwest Chicken Wrap', category: 'mains', note: 'Griddled, with heat.' },
  { id: 'pasta', name: 'Pasta', category: 'mains', note: 'Tossed to order.' },
  { id: 'mushroom-soup', name: 'Mushroom Soup', category: 'small', note: 'Velvety, with warm bread.' },
  { id: 'quinoa-salad', name: 'Zesty Lime Quinoa Salad', category: 'small', note: 'Sharp, green, stacked.' },
  { id: 'loose-prawns', name: 'Loose Prawns', category: 'small', note: 'Crisp, tossed, piled high.' },
  { id: 'dimsums', name: 'Dimsums', category: 'small', note: 'Steamed, by the basket.' },
];
