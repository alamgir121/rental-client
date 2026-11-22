## project name RentEase

## Purpose
RentEase is an equipment rental marketplace. Owners list their equipment for rent, customers browse, book and pay securely online, and admins manage users, listings and rentals through a transparent, role-based platform.

## Live URL
 https://rental-client-omega.vercel.app


## Key Features
- Email/password and Google authentication (BetterAuth with MongoDB adapter) plus JWT-based sessions
- Role-Based Access Control: Customer, Owner and Admin dashboards with protected routes
- Private routes stay logged in after page reload
- Home page with banner, featured equipment, categories, why choose us, how it works, stats and customer reviews (Framer Motion animations)
- All Equipment page with server-side search, filters (category, rental type, price range, availability), sorting and pagination
- Equipment details page with owner info, rental terms, favorites and a booking modal with live total calculation
- Stripe Checkout payment; booking and transaction are saved after successful payment
- Customer dashboard: My Rentals, Favorites, Profile
- Owner dashboard: Add/Update/Delete equipment (imgbb image upload), My Equipment Rental, analytics charts
- Admin dashboard: manage users and roles, approve/reject equipment, monitor all rentals, platform analytics charts
- Dark/Light theme toggle saved in localStorage
- Fully responsive design, loading page, error page and 404 page
- Environment variables used to protect all keys and credentials

## npm Packages Used
- next, react, react-dom
- better-auth
- mongodb
- framer-motion
- recharts
- sweetalert2
- lucide-react
- tailwindcss, postcss, autoprefixer
- daisyui

## Run Locally

npm install
npm run dev
