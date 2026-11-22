"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "./Providers";

const links = [["/", "Home"], ["/equipment", "All Equipment"], ["/#how-it-works", "How It Works"], ["/#contact", "Contact Us"]];

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const path = usePathname();
  const items = (
    <>
      {links.map(([h, l]) => (
        <li key={h}><Link href={h} className={path === h ? "text-primary font-semibold" : ""}>{l}</Link></li>
      ))}
    </>
  );
  return (
    <header className="sticky top-0 z-40 bg-base-100/90 backdrop-blur border-b border-base-300">
      <div className="page-wrap navbar px-0">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle"><Menu /></label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56 border border-base-300">
              {items}
              {!user && <><li><Link href="/login">Login</Link></li><li><Link href="/register">Register</Link></li></>}
            </ul>
          </div>
          <Logo />
        </div>
        <div className ="navbar-center hidden lg:flex"><ul className="menu menu-horizontal gap-1">{items}</ul></div>
        <div className="navbar-end gap-2">
          <ThemeToggle />
          {loading ? null : user ? (
            <>
              <Link href="/dashboard" className="btn btn-primary btn-sm hidden sm:inline-flex">Dashboard</Link>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="avatar cursor-pointer">
                  <div className="w-9 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                    <img src={user.photo || "https://placehold.co/80x80?text=U"} alt={user.name || "user"} />
                  </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 border border-base-300">
                  <li className="px-3 py-2 text-xs opacity-70">{user.email}</li>
                  <li><Link href="/dashboard">Dashboard</Link></li>
                  <li><button onClick={logout}>Logout</button></li>
                </ul>
              </div>
            </>
          ) : (
            <div className="hidden lg:flex gap-2">
              <Link href="/login" className="btn btn-outline btn-primary btn-sm">Login</Link>
              <Link href="/register" className="btn btn-primary btn-sm">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
