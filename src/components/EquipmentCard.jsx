"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { useAuth } from "./Providers";
import { money } from "@/lib/utils";

export default function EquipmentCard({ item }) {
  const { user } = useAuth();
  const router =  useRouter();
  const available = item.quantity > 0;
  const go = () => router.push(user ? `/equipment/${item._id}` : `/login?redirect=${encodeURIComponent(`/equipment/${item._id}`)}`);
  return (
    <div className="card-eq card bg-base-100 border border-base-300 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
      <figure className="h-52 w-full bg-base-200"><img src={item.image} alt={item.name} className="h-full w-full object-cover" /></figure>
      <div className="card-body p-5 gap-2">
        <div className="flex justify-between items-start gap-2">
          <span className="badge badge-primary badge-outline text-xs">{item.category}</span>
          <span className={`badge ${available ? "badge-success" : "badge-error"} badge-sm`}>{available ? "Available" : "Unavailable"}</span>
        </div>
        <h3 className="card-title text-lg line-clamp-1">{item.name}</h3>
        <p className="flex items-center gap-1 text-sm opacity-70"><MapPin size={14} />{item.location}</p>
        <div className="mt-auto flex items-end justify-between pt-2">
          <p><span className="text-xl font-bold text-primary">{money(item.price)}</span><span className="text-sm opacity-70"> / {item.rentalType}</span></p>
          <button onClick={go} className="btn btn-primary btn-sm">View Details</button>
        </div>
      </div>
    </div>
  );
}
