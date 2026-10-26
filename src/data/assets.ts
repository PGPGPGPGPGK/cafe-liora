/**
 * Every photograph used on this site comes from Cafe Liora's own material.
 * Originals are kept untouched in assets/originals/; the responsive
 * WebP derivatives in public/images/liora/ are produced by `npm run images`.
 *
 * `widths` lists the derivative widths that exist on disk for that file, so the
 * <Photo> component can build an accurate srcset. An asset with `file: null`
 * has not been supplied yet and renders as an elegant placeholder instead of
 * unrelated stock photography.
 */
export type LioraAsset = {
  id: string;
  /** Basename in public/images/liora/, or null when the photo is not supplied. */
  file: string | null;
  alt: string;
  description: string;
  source: string;
  widths: number[];
  /** Intrinsic width / height, used to reserve layout space before load. */
  ratio: number;
};

const asset = (a: LioraAsset) => a;

export const assets = {
  courtyard01: asset({
    id: 'courtyard-01',
    file: 'courtyard-01',
    alt: "Cafe Liora's outdoor courtyard: cream walls, an arched wooden door under the LIORA sign, rattan chairs with olive cushions and canvas shade sails overhead.",
    description: 'Courtyard entrance — arched door and LIORA signage',
    source: 'Supplied by client (Cafe_Liora_Assets/courtyard-01.png)',
    widths: [400, 800, 1200, 1536],
    ratio: 1536 / 1024,
  }),
  courtyard02: asset({
    id: 'courtyard-02',
    file: null,
    alt: 'Second courtyard photograph of Cafe Liora.',
    description: 'Courtyard, second angle',
    source: 'Pending from client (noted in the supplied README.txt)',
    widths: [],
    ratio: 3 / 2,
  }),
  watermelonMocktail: asset({
    id: 'watermelon-mocktail',
    file: 'watermelon-mocktail',
    alt: 'Watermelon mocktail served at Cafe Liora in a tall glass.',
    description: 'Watermelon mocktail',
    source: 'Supplied by client (Cafe_Liora_Assets/watermelon-mocktail.png)',
    widths: [400, 682],
    ratio: 682 / 1024,
  }),
  coffeeLatte: asset({
    id: 'coffee-latte',
    file: 'coffee-latte',
    alt: 'A Cafe Liora latte with rosetta latte art in a ceramic cup.',
    description: 'Latte art',
    source: 'Supplied by client (Cafe_Liora_Assets/coffee-latte.png)',
    widths: [400, 800, 1076],
    ratio: 1076 / 1072,
  }),
  biscoffShake: asset({
    id: 'biscoff-shake',
    file: 'biscoff-shake',
    alt: 'Lotus Biscoff shake from Cafe Liora, topped with cream and a Biscoff biscuit.',
    description: 'Lotus Biscoff shake',
    source: 'Supplied by client (Cafe_Liora_Assets/biscoff-shake.png)',
    widths: [400, 800, 1200, 1535],
    ratio: 1535 / 2048,
  }),
} satisfies Record<string, LioraAsset>;

export type AssetId = keyof typeof assets;
