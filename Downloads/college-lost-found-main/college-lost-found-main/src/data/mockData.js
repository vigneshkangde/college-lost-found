// Realistic mock data for College Lost & Found
// Ready for future Supabase schema integration (matches tables: items, categories, claims, locations)

export const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'Grid' },
  { id: 'electronics', name: 'Electronics', icon: 'Laptop' },
  { id: 'id-cards', name: 'ID & Cards', icon: 'CreditCard' },
  { id: 'bags', name: 'Bags', icon: 'Briefcase' },
  { id: 'stationery', name: 'Stationery', icon: 'BookOpen' },
  { id: 'clothing', name: 'Clothing', icon: 'Shirt' },
  { id: 'other', name: 'Other', icon: 'Package' }
];

export const CAMPUS_LOCATIONS = [
  'Central Library, 2nd Floor Study Commons',
  'Student Dining Hall near recycling station',
  'Engineering Hall, Room 302',
  'Main Auditorium, Lecture Hall B',
  'Campus Transit Stop / South Gate',
  'Campus Recreation Center & Gym',
  'Administrative Block, Main Lobby',
  'Science Complex, Chemistry Lab 3',
  'Design & Architecture Studio'
];

export const INITIAL_ITEMS = [
  {
    id: 'item-1',
    type: 'lost',
    title: 'Black Wireless Earbuds',
    category: 'electronics',
    categoryName: 'Electronics',
    location: 'Central Library, 2nd Floor Study Commons',
    date: 'Oct 7, 2026',
    time: '3:30 PM',
    status: 'lost',
    description: 'Black charging case with a small star sticker on the back. Left on table 4.',
    distinctiveMarks: 'Tiny star sticker on the back of the charging case. Right earbud has medium tip.',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    contactEmail: 'alex.smith@college.edu',
    reporterName: 'Alex Smith',
    studentId: 'ST-2024-8841',
    storageLocation: 'Campus Security Center - Locker #14',
    matchedWith: []
  },
  {
    id: 'item-2',
    type: 'found',
    title: 'Blue Water Bottle',
    category: 'other',
    categoryName: 'Other',
    location: 'Student Dining Hall near recycling station',
    date: 'Oct 7, 2026',
    time: '12:15 PM',
    status: 'found',
    description: 'Hydro Flask 32oz with wide mouth straw lid and engineering decal.',
    distinctiveMarks: 'Has an "Engineering 2027" vinyl decal and slight scratch on base.',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    contactEmail: 'campus.desk@college.edu',
    reporterName: 'Dining Hall Staff',
    studentId: 'STAFF-102',
    storageLocation: 'Student Union Help Desk',
    matchedWith: []
  },
  {
    id: 'item-3',
    type: 'lost',
    title: 'Scientific Calculator',
    category: 'stationery',
    categoryName: 'Stationery',
    location: 'Engineering Hall, Room 302',
    date: 'Oct 6, 2026',
    time: '1:10 PM',
    status: 'lost',
    description: 'Casio fx-991EX ClassWiz calculator with initials "S.K." carved inside the hard cover.',
    distinctiveMarks: 'Initials "S.K." carved with silver marker inside the plastic slide cover.',
    imageUrl: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80',
    contactEmail: 'sarah.k@college.edu',
    reporterName: 'Sarah Kim',
    studentId: 'ST-2025-1049',
    storageLocation: null,
    matchedWith: []
  },
  {
    id: 'item-4',
    type: 'found',
    title: 'Black Backpack',
    category: 'bags',
    categoryName: 'Bags',
    location: 'Main Auditorium, Lecture Hall B',
    date: 'Oct 5, 2026',
    time: '11:00 AM',
    status: 'found',
    description: 'The North Face backpack containing spiral notebooks and an orange paracord zipper pull.',
    distinctiveMarks: 'Has an orange paracord zipper pull on the front pocket.',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    contactEmail: 'facilities@college.edu',
    reporterName: 'Kevin Vance',
    studentId: 'TA-9921',
    storageLocation: 'Campus Security Center - Vault B',
    matchedWith: []
  },
  {
    id: 'item-5',
    type: 'lost',
    title: 'College ID Card',
    category: 'id-cards',
    categoryName: 'ID & Cards',
    location: 'Campus Transit Stop / South Gate',
    date: 'Oct 7, 2026',
    time: '5:45 PM',
    status: 'lost',
    description: 'Student ID card in a clear sleeve with maroon university lanyard.',
    distinctiveMarks: 'Kept inside a clear plastic sleeve with maroon lanyard string.',
    imageUrl: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?auto=format&fit=crop&w=800&q=80',
    contactEmail: 'rahul.p@college.edu',
    reporterName: 'Rahul Patel',
    studentId: 'ST-2023-4512',
    storageLocation: null,
    matchedWith: []
  },
  {
    id: 'item-6',
    type: 'found',
    title: 'Set of Keys',
    category: 'other',
    categoryName: 'Other',
    location: 'Campus Recreation Center & Gym',
    date: 'Oct 6, 2026',
    time: '6:30 PM',
    status: 'found',
    description: 'Three brass keys on a red campus athletic lanyard with a green rubber cap.',
    distinctiveMarks: 'Red woven lanyard with text "STATE ATHLETICS". One key has a green rubber cap.',
    imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80',
    contactEmail: 'gym.desk@college.edu',
    reporterName: 'Attendant Dave',
    studentId: 'STAFF-409',
    storageLocation: 'Recreation Center Reception Desk',
    matchedWith: []
  }
];

export const INITIAL_CLAIMS = [
  {
    id: 'claim-301',
    itemId: 'item-2',
    itemTitle: 'Blue Water Bottle',
    claimantName: 'Jordan Lee',
    claimantEmail: 'jordan.lee@college.edu',
    studentId: 'ST-2024-9021',
    claimDate: 'Oct 7, 2026',
    proofDescription: 'I left my Hydro Flask near the dining hall. It has an Engineering 2027 vinyl sticker.',
    status: 'Approved - Ready for Pickup',
    pickupInstructions: 'Pick up at Student Union Help Desk with student ID.'
  },
  {
    id: 'claim-302',
    itemId: 'item-6',
    itemTitle: 'Set of Keys',
    claimantName: 'Samira Khan',
    claimantEmail: 'samira.k@college.edu',
    studentId: 'ST-2025-3310',
    claimDate: 'Oct 8, 2026',
    proofDescription: 'Red athletic lanyard with locker key #142 and green key protector cap.',
    status: 'Under Review by Security',
    pickupInstructions: 'Awaiting campus security ID verification.'
  }
];
