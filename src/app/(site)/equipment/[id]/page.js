"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Heart, MapPin, Package, Tag } from "lucide-react";
import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/components/Providers";
import { Spinner } from "@/components/ui";
import { api } from "@/lib/api";
import { money, notify, rentalTotal } from "@/lib/utils";

function Details() {
  const { id } = useParams();
  const { role } = useAuth();
  const [item, setItem] = useState(null);
  const [fav, setFav] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api(`/api/equipment/${id}`).then(setItem).catch((e) => { notify("error", e.message); setItem(false); });
    if (role === "customer") api(`/api/favorites/${id}`).then((r) => setFav(r.isFavorite)).catch(() => {});
  }, [id, role]);

  const toggleFav = async () => {
    try {
      await api(`/api/favorites/${id}`, { method: fav ? "DELETE" : "POST" });
      setFav(!fav); notify("success", fav ? "Removed from favorites" : "Added to favorites");
    } catch (e) { notify("error", e.message); }
  };
  if (item === null) return <Spinner full />;
  if (item === false) return <p className="text-center py-20">Equipment not found.</p>;

  return (
    <div className="page-wrap py-12 grid lg:grid-cols-2 gap-10">
      <img src={item.image} alt={item.name} className="w-full h-[420px] object-cover rounded-2xl border border-base-300" />
      <div className="space-y-5">
        <span className="badge badge-primary badge-outline">{item.category}</span>
        <h1 className="font-display text-3xl font-bold">{item.name}</h1>
        <p className="text-3xl font-bold text-primary">{money(item.price)} <span className="text-base font-normal opacity-70">/ {item.rentalType}</span></p>
        <p className="opacity-80">{item.description}</p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <p className="flex gap-2 items-center"><MapPin size={16} />{item.location}</p>
          <p className="flex gap-2 items-center"><Package size={16} />{item.quantity} available</p>
          <p className="flex gap-2 items-center"><Tag size={16} />{item.brand} {item.model}</p>
          <p>Condition: <b>{item.condition}</b></p>
        </div>
        <div className="flex items-center gap-3 bg-base-200 rounded-xl p-4">
          <div className="avatar"><div className="w-12 rounded-full"><img src={item.owner?.photo || "https://placehold.co/80x80?text=O"} alt="owner" /></div></div>
          <div><p className="font-semibold">{item.owner?.name}</p><p className="text-xs opacity-70">{item.owner?.email}</p></div>
        </div>
        <div className="border border-base-300 rounded-xl p-4"><h3 className="font-semibold mb-1">Rental Terms & Conditions</h3><p className="text-sm opacity-80 whitespace-pre-line">{item.terms}</p></div>
        {role === "customer" ? (
          <div className="flex gap-3">
            <button disabled={item.quantity < 1} onClick={() => setOpen(true)} className="btn btn-primary flex-1">Book Now</button>
            <button onClick={toggleFav} className={`btn ${fav ? "btn-error" : "btn-outline"}`}><Heart size={18} fill={fav ? "currentColor" : "none"} />{fav ? "Favorited" : "Add to Favorites"}</button>
          </div>
        ) : <p className="alert alert-info text-sm">Only customer accounts can book equipment or save favorites.</p>}
      </div>
      {open && <BookingModal item={item} onClose={() => setOpen(false)} />}
    </div>
  );
}

function BookingModal({ item, onClose }) {
  const today = new Date().toISOString().slice(0, 10);
  const [f, setF] = useState({ startDate: today, endDate: today, quantity: 1, phone: "", address: "", notes: "" });
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const total = rentalTotal(item.price, item.rentalType, f.startDate, f.endDate, +f.quantity || 0);

  const submit = async (e) => {
    e.preventDefault();
    if (f.endDate < f.startDate) return notify("error", "End date must be after start date");
    if (+f.quantity > item.quantity) return notify("error", `Max ${item.quantity} available`);
    setBusy(true);
    try {
      const r = await api("/api/bookings/checkout", { method: "POST", body: { equipmentId: item._id, ...f } }); // availability checked server-side
      window.location.href = r.url; // Stripe Checkout
    } catch (err) { notify("error", err.message); setBusy(false); }
  };
  return (
    <dialog className="modal modal-open">
      <form onSubmit={submit} className="modal-box max-w-xl space-y-3">
        <h3 className="font-bold text-xl">Book {item.name}</h3>
        <div className="grid grid-cols-2 gap-3">
          <label className="form-control"><span className="label-text">Start Date</span><input required type="date" min={today} className="input input-bordered" value={f.startDate} onChange={set("startDate")} /></label>
          <label className="form-control"><span className="label-text">End Date</span><input required type="date" min={f.startDate} className="input input-bordered" value={f.endDate} onChange={set("endDate")} /></label>
          <label className="form-control"><span className="label-text">Quantity</span><input required type="number" min="1" max={item.quantity} className="input input-bordered" value={f.quantity} onChange={set("quantity")} /></label>
          <label className="form-control"><span className="label-text">Contact Number</span><input required className="input input-bordered" value={f.phone} onChange={set("phone")} /></label>
        </div>
        <label className="form-control"><span className="label-text">Delivery Address</span><input required className="input input-bordered" value={f.address} onChange={set("address")} /></label>
        <label className="form-control"><span className="label-text">Additional Notes</span><textarea rows={2} className="textarea textarea-bordered" value={f.notes} onChange={set("notes")} /></label>
        <div className="flex justify-between items-center bg-base-200 rounded-lg p-3"><span>Total rental amount</span><b className="text-xl text-primary">{money(total)}</b></div>
        <div className="modal-action">
          <button type="button" className="btn" onClick={onClose}>Cancel</button>
          <button disabled={busy} className="btn btn-primary">{busy && <span className="loading loading-spinner" />}Confirm & Pay</button>
        </div>
      </form>
    </dialog>
  );
}
export default function Page() { return <PrivateRoute><Details /></PrivateRoute>; }
