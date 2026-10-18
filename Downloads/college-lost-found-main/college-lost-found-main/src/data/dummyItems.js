// Dummy items and categories for College Lost & Found

export const DUMMY_ITEMS = [
  {
    id: 'item-1',
    title: 'Black Wireless Earbuds',
    category: 'Electronics',
    location: 'Central Library, 2nd Floor Study Commons',
    date: 'Oct 7, 2026',
    status: 'lost', // 'lost' | 'found'
    description: 'Black charging case with a small star sticker on the back. Left on table 4.',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'item-2',
    title: 'Blue Water Bottle',
    category: 'Other',
    location: 'Student Dining Hall near recycling station',
    date: 'Oct 7, 2026',
    status: 'found',
    description: 'Hydro Flask 32oz with wide mouth straw lid and engineering decal.',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'item-3',
    title: 'Scientific Calculator',
    category: 'Stationery',
    location: 'Engineering Hall, Room 302',
    date: 'Oct 6, 2026',
    status: 'lost',
    description: 'Casio fx-991EX ClassWiz calculator with initials "S.K." carved inside the hard cover.',
    imageUrl: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'item-4',
    title: 'Black Backpack',
    category: 'Bags',
    location: 'Main Auditorium, Lecture Hall B',
    date: 'Oct 5, 2026',
    status: 'found',
    description: 'The North Face backpack containing spiral notebooks and an orange paracord zipper pull.',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'item-5',
    title: 'College ID Card',
    category: 'ID & Cards',
    location: 'Campus Transit Stop / South Gate',
    date: 'Oct 7, 2026',
    status: 'lost',
    description: 'Student ID card in a clear sleeve with maroon university lanyard.',
    imageUrl: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'item-6',
    title: 'Set of Keys',
    category: 'Other',
    location: 'Campus Recreation Center & Gym',
    date: 'Oct 6, 2026',
    status: 'found',
    description: 'Three brass keys on a red campus athletic lanyard with a green rubber cap.',
    imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80'
  }
];

export const CATEGORIES = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'Laptop',
    itemCount: 14,
    description: 'Phones, laptops, chargers, headphones'
  },
  {
    id: 'id-cards',
    name: 'ID & Cards',
    icon: 'CreditCard',
    itemCount: 9,
    description: 'Student cards, wallets, passes, driver licenses'
  },
  {
    id: 'bags',
    name: 'Bags',
    icon: 'Briefcase',
    itemCount: 8,
    description: 'Backpacks, totes, gym bags, pouches'
  },
  {
    id: 'stationery',
    name: 'Stationery',
    icon: 'BookOpen',
    itemCount: 12,
    description: 'Calculators, textbooks, notebooks, pencil cases'
  },
  {
    id: 'clothing',
    name: 'Clothing',
    icon: 'Shirt',
    itemCount: 6,
    description: 'Jackets, hoodies, scarves, hats, glasses'
  },
  {
    id: 'other',
    name: 'Other',
    icon: 'Package',
    itemCount: 11,
    description: 'Bottles, keys, umbrellas, accessories'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Report',
    description: 'Submit a lost or found report with item details, location, and photos in seconds.',
    icon: 'FileEdit'
  },
  {
    step: '02',
    title: 'Find a Match',
    description: 'Our campus directory matches reported lost belongings against found entries.',
    icon: 'Search'
  },
  {
    step: '03',
    title: 'Connect',
    description: 'Communicate securely or review custody records with campus security or the finder.',
    icon: 'Users'
  },
  {
    step: '04',
    title: 'Return',
    description: 'Verify identity and reclaim your belonging safely at a campus safe zone.',
    icon: 'CheckCircle2'
  }
];
