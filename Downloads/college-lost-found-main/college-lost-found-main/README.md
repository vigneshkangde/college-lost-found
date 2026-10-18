# CampusFound — College Lost & Found Web Application

A modern, clean, mobile-responsive College Lost & Found frontend built for university students and campus safety staff.

## Tech Stack
- **React 19**
- **Vite**
- **Tailwind CSS v4**
- **React Router v7**
- **Lucide Icons**
- **JavaScript (ES Modules)**

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## Pages Implemented

| Route | Page | Purpose |
|---|---|---|
| `/` | **Home** | Campus Hero with prompt ("Lost something?" / "Found something?"), live search, action buttons, recent lost & found feed, categories, and 3-step safety guide. |
| `/browse` | **Browse Items** | Multi-faceted search, type filter (All, Lost, Found, Claimed), campus location dropdown, category pills, and sorting. |
| `/items/:id` | **Item Details** | Detailed view with custody location, distinctive marks, match suggestions, contact options, and interactive ownership claim modal. |
| `/report-lost` | **Report Lost Item** | Comprehensive intake form with photo upload / sample presets, campus location, date/time, description, distinctive marks, and honor code declaration. |
| `/report-found` | **Report Found Item** | Intake form for found belongings with safe custody storage selector (Security vault, Help desk, Library) and student matching hints. |
| `/login` | **Login** | University single sign-on interface with 1-click demo login buttons for Student and Admin profiles. |
| `/register` | **Register** | Student onboarding with academic department selection and campus honor code certification. |
| `/my-reports` | **My Reports** | Student dashboard to monitor submitted lost/found reports, review match indicators, and mark cases as resolved. |
| `/my-claims` | **My Claims** | Ownership claim tracking with review status ("Under Review", "Approved - Ready for Pickup") and safe collection directions. |
| `/admin` | **Admin Dashboard** | Campus Security console with key statistics, claim approval/rejection workflows, and master inventory management. |

---

## Reusable Components

All UI components reside in `src/components/`:
- `Navbar.jsx`: Fixed responsive header with college branding, quick report actions, role switch menu, and mobile drawer.
- `Footer.jsx`: University safety desk hotline, 24/7 booth info, safe custody guidance, and quick links.
- `SearchBar.jsx`: Accessible search input with clear trigger and flexible sizing.
- `ItemCard.jsx`: Standardized card with photo, category chip, location, calendar date, match alert, and status badge.
- `CategoryFilter.jsx`: Category selector supporting pill mode and card grid mode with live item counts.
- `StatusBadge.jsx`: Color-coded pill with status dot (`Lost`, `Found`, `Claimed`, `Returned`).
- `Button.jsx`: Universal button supporting multiple variants (`primary`, `lost`, `found`, `outline`, `ghost`), links, and icons.
- `SectionHeader.jsx`: Consistent section title, uppercase kicker, subtitle, and action placement.
- `ClaimModal.jsx`: Modal for ownership verification questions and physical ID verification agreement.

---

## State & Data Architecture

- **`src/data/mockData.js`**: Separated mock database of campus items (Earbuds, Water Bottle, Student ID, Backpack, Calculator, Keys, etc.), campus locations, and categories.
- **`src/context/ItemContext.jsx`**: Decoupled state provider mimicking future Supabase queries (`addItem`, `claimItem`, `updateItemStatus`, `getItemById`, `getMatchSuggestions`, `currentUser`).

### Ready for Supabase:
When ready to integrate Supabase, you only need to swap the in-memory array operations inside `src/context/ItemContext.jsx` with your Supabase client calls (`supabase.from('items').insert(...)`). **Zero UI page rewrites required.**
