"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LayoutDashboard, ClipboardList, Heart, User, PlusSquare, Boxes, Receipt, Users, ShieldCheck, Home, LogOut } from "lucide-react";
import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/components/Providers";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";

const menus = {
  customer: [["/dashboard", "Overview", LayoutDashboard], ["/dashboard/my-rentals", "My Rentals", ClipboardList], ["/dashboard/favorites", "Favorites", Heart], ["/dashboard/profile", "Profile", User]],
  owner: [["/dashboard", "Analytics", LayoutDashboard], ["/dashboard/add-equipment", "Add Equipment", PlusSquare], ["/dashboard/my-equipment", "My Equipment", Boxes], ["/dashboard/my-equipment-rental", "My Equipment Rental", Receipt], ["/dashboard/profile", "My Profile", User]],
  admin: [["/dashboard", "Analytics", LayoutDashboard], ["/dashboard/users", "All Users", Users], ["/dashboard/all-equipment", "All Equipment", ShieldCheck], ["/dashboard/all-rentals", "All Rentals", Receipt], ["/dashboard/profile", "My Profile", User]],
};

function Shell({ children }) {
  const { user, logout } = useAuth();
  const path = usePathname();
  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-200">
      <input id="dash-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-100 border-b border-base-300 px-4 sticky top-0 z-30">
          <label htmlFor="dash-drawer" className="btn btn-ghost btn-circle lg:hidden"><Menu /></label>
          <div className="flex-1 font-semibold capitalize px-2">{user.role} Dashboard</div>
          <ThemeToggle />
          <div className="avatar ml-2"><div className="w-9 rounded-full"><img src={user.photo || "https://placehold.co/80x80?text=U"} alt="me" /></div></div>
        </div>
        <main className="p-4 md:p-8 w-full">{children}</main>
      </div>
      <div className="drawer-side z-40">
        <label htmlFor="dash-drawer" className="drawer-overlay" />
        <aside className="w-64 min-h-full bg-base-100 border-r border-base-300 p-4 flex flex-col gap-4">
          <Logo />
          <div className="text-center py-3 border-y border-base-300">
            <div className="avatar"><div className="w-16 rounded-full"><img src={user.photo || "https://placehold.co/80x80?text=U"} alt="me" /></div></div>
            <p className="font-semibold mt-2">{user.name}</p><p className="text-xs opacity-70 break-all">{user.email}</p>
          </div>
          <ul className="menu p-0 gap-1 flex-1">
            {menus[user.role].map(([h, l, Icon]) => (
              <li key={h}><Link href={h} className={path === h ? "active" : ""}><Icon size={18} />{l}</Link></li>
            ))}
          </ul>
          <ul className="menu p-0">
            <li><Link href="/"><Home size={18} />Home</Link></li>
            <li><button onClick={logout}><LogOut size={18} />Logout</button></li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
export default function DashboardLayout({ children }) {
  return <PrivateRoute><Shell>{children}</Shell></PrivateRoute>;
}
