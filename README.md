# RentEase — Equipment Rental Platform (Client)

**Purpose:** A rental marketplace where owners list equipment and customers browse, book and pay securely. Admins moderate listings and users.
**Live URL:** _add after deploy_ · **Server repo:** _add_

## Key features
- Next.js App Router, DaisyUI, responsive + dark/light theme (saved in localStorage)
- BetterAuth (email/password + Google, MongoDB adapter) + server-issued JWT, role-based dashboards (Customer / Owner / Admin)
- Server-side search, filters, sorting, pagination on All Equipment
- Booking modal → availability check → Stripe Checkout → booking & payment saved
- Favorites, imgbb image upload, owner/admin CRUD, approval workflow
- Analytics charts for Admin & Owner (Recharts), Framer Motion animations
- Private routes survive page reload (auth restored before guard runs)

## npm packages
next, react, better-auth, mongodb, framer-motion, recharts, sweetalert2, lucide-react, tailwindcss, daisyui

## Run
```
cp .env.example .env.local   # fill values
npm install
npm run dev
```
Admin: set `ADMIN_EMAIL` on the server, register that email, done.
