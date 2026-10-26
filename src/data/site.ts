export const site = {
  name: 'Cafe Liora',
  tagline: 'Sip slow. Play fast.',
  subheading: 'Coffee, good food, and a little friendly competition in Nagole.',
  bio: 'Café & Pickleball Experience — your new hangout spot.',
  address: {
    lines: ['Plot No. 13, Road No. 4', 'Samathapuri Colony, Nagole', 'Hyderabad, Telangana 500102'],
    oneLine:
      'Plot No. 13, Road No. 4, Samathapuri Colony, Nagole, Hyderabad, Telangana 500102',
  },
  phone: '+91 99662 88488',
  phoneHref: 'tel:+919966288488',
  instagram: 'https://www.instagram.com/cafe.liora_/',
  // Same number as the café's listed phone line.
  whatsapp: 'https://wa.me/919966288488',
  instagramHandle: '@cafe.liora_',
  maps: 'https://maps.app.goo.gl/ZF22JRFu9BLUhRYc7',
} as const;

export const nav = [
  { id: 'eat-sip', label: 'Eat & Sip' },
  { id: 'pickleball', label: 'Pickleball' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'visit', label: 'Visit' },
] as const;
