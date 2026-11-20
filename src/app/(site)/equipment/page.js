"use client";
import { useEffect, useState } from "react";
import { api, qs } from "@/lib/api";
import { CATEGORIES, RENTAL_TYPES } from "@/lib/utils";
import EquipmentCard from "@/components/EquipmentCard";
import { Pagination, SectionTitle, Spinner } from "@/components/ui";

const init = { q: "", category: "all", rentalType: "all", minPrice: "", maxPrice: "", availability: "", sort: "newest", page: 1 };

export default function AllEquipment() {
  const [f, setF] = useState(init);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");

  
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("category");
    if (c) setF((p) => ({ ...p, category: c }));
  }, []);
  useEffect(() => {
    const t = setTimeout(() => setF((p) => ({ ...p, q: search, page: 1 })), 400); 
    return () => clearTimeout(t);
  }, [search]);
  useEffect(() => {
    setData(null);
    api(`/api/equipment?${qs({ ...f, limit: 9 })}`, { auth: false }).then(setData).catch(() => setData({ items: [], pages: 0, total: 0 }));
  }, [f]);

  const upd = (k) => (e) => setF({ ...f, [k]: e.target.value, page: 1 });
  return (
    <div className="page-wrap py-12">
      <SectionTitle title="All Equipment" sub="Search, filter and sort to find the perfect match." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 bg-base-200 p-4 rounded-xl mb-8">
        <input className="input input-bordered lg:col-span-2" placeholder="Search by name, category or location" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="select select-bordered" value={f.category} onChange={upd("category")}>
          <option value="all">All Categories</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className="select select-bordered capitalize" value={f.rentalType} onChange={upd("rentalType")}>
          <option value="all">All Rental Types</option>{RENTAL_TYPES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <input type="number" min="0" className="input input-bordered" placeholder="Min price" value={f.minPrice} onChange={upd("minPrice")} />
        <input type="number" min="0" className="input input-bordered" placeholder="Max price" value={f.maxPrice} onChange={upd("maxPrice")} />
        <select className="select select-bordered" value={f.availability} onChange={upd("availability")}>
          <option value="">Any Availability</option><option value="available">Available</option><option value="unavailable">Unavailable</option>
        </select>
        <select className="select select-bordered" value={f.sort} onChange={upd("sort")}>
          <option value="newest">Recently Added</option><option value="price_asc">Price: Low to High</option><option value="price_desc">Price: High to Low</option>
        </select>
      </div>
      {!data ? <Spinner /> : data.items.length === 0 ? (
        <p className="text-center py-16 opacity-70">No equipment matches your filters.</p>
      ) : (
        <>
          <p className="mb-4 text-sm opacity-70">{data.total} result(s)</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{data.items.map((it) => <EquipmentCard key={it._id} item={it} />)}</div>
          <Pagination page={data.page} pages={data.pages} onChange={(p) => { setF({ ...f, page: p }); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
        </>
      )}
    </div>
  );
}
