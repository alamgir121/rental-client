"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Boxes, CheckCheck, ClipboardList, DollarSign, Hourglass, Users, Receipt, Heart } from "lucide-react";
import { useAuth } from "@/components/Providers";
import { Spinner, StatCard } from "@/components/ui";
import { api } from "@/lib/api";
import { money } from "@/lib/utils";

const Chart = ({ title, children }) => (
  <div className="bg-base-100 border border-base-300 rounded-xl p-5">
    <h3 className="font-semibold mb-4">{title}</h3><div className="h-72"><ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer></div>
  </div>
);

export default function Overview() {
  const { role } = useAuth();
  const [d, setD] = useState(null);
  useEffect(() => {
    if (role === "admin") api("/api/analytics/admin").then(setD);
    else if (role === "owner") api("/api/analytics/owner").then(setD);
    else Promise.all([api("/api/bookings/my?limit=50"), api("/api/favorites")]).then(([b, f]) => setD({ b, f }));
  }, [role]);
  if (!d) return <Spinner />;

  if (role === "admin") return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard label="Total Users" value={d.totalUsers} icon={Users} />
        <StatCard label="Total Equipment" value={d.totalEquipment} icon={Boxes} />
        <StatCard label="Total Bookings" value={d.totalBookings} icon={ClipboardList} />
        <StatCard label="Pending Approvals" value={d.pendingApprovals} icon={Hourglass} />
        <StatCard label="Completed Rentals" value={d.completedRentals} icon={CheckCheck} />
        <StatCard label="Total Revenue" value={money(d.totalRevenue)} icon={DollarSign} />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <Chart title="Monthly Bookings"><BarChart data={d.monthlyBookings}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="bookings" fill="#d97706" radius={[6, 6, 0, 0]} /></BarChart></Chart>
        <Chart title="Monthly Revenue"><LineChart data={d.monthlyBookings}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Line dataKey="revenue" stroke="#0f766e" strokeWidth={3} /></LineChart></Chart>
      </div>
    </div>
  );
  if (role === "owner") return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Listed Equipment" value={d.totalListed} icon={Boxes} />
        <StatCard label="Total Rentals" value={d.totalRentals} icon={Receipt} />
        <StatCard label="Completed Rentals" value={d.completedRentals} icon={CheckCheck} />
        <StatCard label="Total Earnings" value={money(d.totalEarnings)} icon={DollarSign} />
      </div>
      <Chart title="Monthly Earnings"><BarChart data={d.monthlyEarnings}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="earnings" fill="#d97706" radius={[6, 6, 0, 0]} /></BarChart></Chart>
    </div>
  );
  const spent = d.b.items.reduce((s, x) => s + x.totalAmount, 0);
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard label="My Rentals" value={d.b.total} icon={ClipboardList} />
        <StatCard label="Favorites" value={d.f.length} icon={Heart} />
        <StatCard label="Total Spent" value={money(spent)} icon={DollarSign} />
      </div>
      <Link href="/equipment" className="btn btn-primary">Browse more equipment</Link>
    </div>
  );
}
