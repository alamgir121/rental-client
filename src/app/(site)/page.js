"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShieldCheck, BadgePercent, CalendarClock, CreditCard, Search, CalendarCheck, PackageCheck, HardHat, Camera, Truck, Tractor, Cpu, PartyPopper } from "lucide-react";
import { api } from "@/lib/api";
import { CATEGORIES, FALLBACK_REVIEWS } from "@/lib/utils";
import EquipmentCard from "@/components/EquipmentCard";
import { SectionTitle, Spinner } from "@/components/ui";

const fade = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const catIcons = [HardHat, Camera, Truck, Tractor, Cpu, PartyPopper];

function Banner() {
  return (
    <section className="relative bg-neutral text-neutral-content overflow-hidden">
      <img src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1800&q=80" alt="Heavy equipment" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="relative page-wrap py-24 md:py-36 grid md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="space-y-6">
          <span className="badge badge-primary">Trusted Rental Marketplace</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">Rent the right equipment, <span className="text-primary">exactly when you need it</span></h1>
          <p className="text-lg opacity-80 max-w-xl">Browse verified machines, cameras, vehicles and event gear from trusted owners. Book by the day, week or month and pay securely online.</p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/equipment" className="btn btn-primary">Browse Equipment</Link>
            <Link href="/register" className="btn btn-outline text-white hover:bg-white hover:text-black">List Your Equipment</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Featured() {
  const [items, setItems] = useState(null);
  useEffect(() => { api("/api/equipment/featured", { auth: false }).then(setItems).catch(() => setItems([])); }, []);
  return (
    <section className="page-wrap pt-20">
      <SectionTitle title="Featured Equipment" sub="Hand-picked, approved listings ready to rent today." />
      {!items ? <Spinner /> : items.length === 0 ? <p className="text-center opacity-70">No equipment yet.</p> : (
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => <motion.div key={it._id} variants={fade}><EquipmentCard item={it} /></motion.div>)}
        </motion.div>
      )}
      <div className="text-center mt-10"><Link href="/equipment" className="btn btn-primary">View All Equipment</Link></div>
    </section>
  );
}

function Categories() {
  return (
    <section className="page-wrap pt-20">
      <SectionTitle title="Popular Categories" sub="Find exactly what your project needs." />
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {CATEGORIES.map((c, i) => {
          const Icon = catIcons[i];
          return (
            <motion.div key={c} variants={fade} whileHover={{ y: -6 }}>
              <Link href={`/equipment?category=${encodeURIComponent(c)}`} className="h-full flex flex-col items-center text-center gap-3 p-6 rounded-xl border border-base-300 bg-base-100 hover:border-primary transition-colors">
                <span className="p-4 rounded-full bg-primary/10 text-primary"><Icon size={30} /></span>
                <span className="font-semibold">{c}</span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

const why = [
  [BadgePercent, "Affordable Prices", "Competitive rates set directly by owners with no hidden fees."],
  [ShieldCheck, "Verified Owners", "Every listing is reviewed and approved by our admin team."],
  [CalendarClock, "Flexible Periods", "Rent daily, weekly or monthly to match your project length."],
  [CreditCard, "Secure Payments", "Stripe-powered checkout keeps your payment details safe."],
];
function Why() {
  return (
    <section className="bg-base-200 mt-20 py-20">
      <div className="page-wrap">
        <SectionTitle title="Why Choose Us" sub="Everything you need for a confident rental experience." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {why.map(([Icon, t, d]) => (
            <div key={t} className="h-full bg-base-100 rounded-xl p-6 border border-base-300 text-center space-y-3">
              <Icon className="mx-auto text-primary" size={36} /><h3 className="font-semibold text-lg">{t}</h3><p className="text-sm opacity-70">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [[Search, "Search", "Filter by category, price and location."], [CalendarCheck, "Book", "Pick your dates and quantity."], [CreditCard, "Pay", "Complete secure Stripe checkout."], [PackageCheck, "Enjoy", "Receive the equipment and get to work."]];
function HowItWorks() {
  return (
    <section id="how-it-works" className="page-wrap pt-20">
      <SectionTitle title="How It Works" sub="Renting is simple in four steps." />
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map(([Icon, t, d], i) => (
          <motion.div variants={fade} key={t} className="h-full relative rounded-xl border border-base-300 p-6 text-center space-y-2">
            <span className="absolute -top-3 left-4 badge badge-primary">{i + 1}</span>
            <Icon className="mx-auto text-primary" size={34} /><h3 className="font-semibold text-lg">{t}</h3><p className="text-sm opacity-70">{d}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Stats() {
  const s = [["500+", "Equipment Listed"], ["1,200+", "Happy Customers"], ["150+", "Verified Owners"], ["4.8/5", "Average Rating"]];
  return (
    <section className="page-wrap pt-20">
      <SectionTitle title="Trusted by Owners & Customers" sub="A growing community built on transparency." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {s.map(([v, l]) => (
          <div key={l} className="rounded-xl bg-neutral text-neutral-content p-8 text-center"><p className="font-display text-3xl font-bold text-primary">{v}</p><p className="opacity-80 mt-1">{l}</p></div>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
  useEffect(() => { api("/api/reviews", { auth: false }).then((r) => r.length >= 4 && setReviews(r)).catch(() => {}); }, []);
  return (
    <section className="page-wrap pt-20">
      <SectionTitle title="What Our Customers Say" sub="Real experiences from our community." />
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.slice(0, 4).map((r, i) => (
          <motion.div variants={fade} key={i} className="h-full bg-base-100 border border-base-300 rounded-xl p-6 flex flex-col gap-3">
            <div className="flex gap-1 text-primary">{Array.from({ length: 5 }, (_, k) => <Star key={k} size={16} fill={k < r.rating ? "currentColor" : "none"} />)}</div>
            <p className="text-sm opacity-80 flex-1">“{r.comment}”</p>
            <p className="font-semibold">{r.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (<><Banner /><Featured /><Categories /><Why /><HowItWorks /><Stats /><Reviews /></>);
}
