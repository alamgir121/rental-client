"use client";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export const Spinner = ({ full }) => (
  <div className={`flex items-center justify-center ${full ? "min-h-[60vh]" : "py-10"}`}>
    <Loader2 className="animate-spin text-primary" size={40} />
  </div>
);
export const SectionTitle = ({ title, sub }) => (
  <div><h2 className="section-title">{title}</h2>{sub && <p className="section-sub">{sub}</p>}</div>
);
const tone = { approved: "success", paid: "success", completed: "success", confirmed: "info", pending: "warning", rejected: "error", cancelled: "error" };
export const Badge = ({ v }) => <span className={`badge badge-${tone[v] || "ghost"} badge-outline capitalize`}>{v}</span>;

export const Table = ({ head, children, empty = "No data found" }) => (
  <div className="overflow-x-auto bg-base-100 border border-base-300 rounded-xl">
    <table className="table">
      <thead className="bg-base-200"><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
      <tbody>{children}</tbody>
    </table>
    {Array.isArray(children) && children.length === 0 && <p className="text-center py-10 opacity-60">{empty}</p>}
  </div>
);
export const StatCard = ({ label, value, icon: Icon }) => (
  <div className="bg-base-100 border border-base-300 rounded-xl p-5 flex items-center gap-4">
    <div className="p-3 rounded-lg bg-primary/10 text-primary">{Icon && <Icon size={24} />}</div>
    <div><p className="text-sm opacity-70">{label}</p><p className="text-2xl font-bold">{value}</p></div>
  </div>
);
export const Pagination = ({ page, pages, onChange }) =>
  pages > 1 ? (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button className="btn btn-sm" disabled={page <= 1} onClick={() => onChange(page - 1)}><ChevronLeft size={16} /></button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button key={p} onClick={() => onChange(p)} className={`btn btn-sm ${p === page ? "btn-primary" : ""}`}>{p}</button>
      ))}
      <button className="btn btn-sm" disabled={page >= pages} onClick={() => onChange(page + 1)}><ChevronRight size={16} /></button>
    </div>
  ) : null;
