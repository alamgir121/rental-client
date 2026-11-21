import Link from "next/link";
import Logo from "./Logo";
import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const XLogo = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-label="X"><path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-7-6.2 7H1.4l8.1-9.3L1 2h7l4.9 6.4L18.9 2Zm-1.2 18h1.9L6.4 3.9H4.4L17.7 20Z" /></svg>
);
export default function Footer() {
  return (
    <footer id="contact" className="bg-neutral text-neutral-content mt-20">
      <div className="page-wrap py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <Logo />
          <p className="opacity-70 max-w-md">RentEase connects equipment owners with customers through a transparent, secure rental marketplace.</p>
          <div className="flex gap-3">
            <a className="btn btn-circle btn-sm btn-outline" href="#" aria-label="X"><XLogo /></a>
            <a className="btn btn-circle btn-sm btn-outline" href="#" aria-label="Facebook"><Facebook size={16} /></a>
            <a className="btn btn-circle btn-sm btn-outline" href="#" aria-label="LinkedIn"><Linkedin size={16} /></a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 opacity-80 text-sm">
            <li><Link href="/">Home</Link></li><li><Link href="/equipment">All Equipment</Link></li>
            <li><Link href="/login">Login</Link></li><li><Link href="/register">Register</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 opacity-80 text-sm">
            <li className="flex gap-2"><MapPin size={16} /> Dhaka, Bangladesh</li>
            <li className="flex gap-2"><Phone size={16} /> +880 1700-000000</li>
            <li className="flex gap-2"><Mail size={16} /> support@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm opacity-70">© {new Date().getFullYear()} RentEase. All rights reserved.</div>
    </footer>
  );
}
