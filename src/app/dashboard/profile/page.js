"use client";
import { useState } from "react";
import { useAuth } from "@/components/Providers";
import { api } from "@/lib/api";
import { notify, uploadImage } from "@/lib/utils";

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const [f, setF] = useState({ name: user.name || "", phone: user.phone || "", address: user.address || "", photo: user.photo || "" });
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const save = async (e) => {
    e.preventDefault(); setBusy(true);
    try {
      const photo = file ? await uploadImage(file) : f.photo;
      await api("/api/users/me", { method: "PATCH", body: { ...f, photo } });
      await refreshUser(); notify("success", "Profile updated");
    } catch (err) { notify("error", err.message); }
    setBusy(false);
  };
  return (
    <form onSubmit={save} className="max-w-2xl bg-base-100 border border-base-300 rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-4">
        <div className="avatar"><div className="w-20 rounded-full"><img src={f.photo || "https://placehold.co/100x100?text=U"} alt="me" /></div></div>
        <div><p className="font-semibold text-lg">{user.name}</p><span className="badge badge-primary capitalize">{user.role}</span></div>
      </div>
      <label className="form-control"><span className="label-text">Name</span><input required className="input input-bordered" value={f.name} onChange={set("name")} /></label>
      <label className="form-control"><span className="label-text">Email</span><input disabled className="input input-bordered" value={user.email} /></label>
      <label className="form-control"><span className="label-text">Phone Number</span><input className="input input-bordered" value={f.phone} onChange={set("phone")} /></label>
      <label className="form-control"><span className="label-text">Address</span><input className="input input-bordered" value={f.address} onChange={set("address")} /></label>
      <label className="form-control"><span className="label-text">Profile Image (upload to change)</span><input type="file" accept="image/*" className="file-input file-input-bordered" onChange={(e) => setFile(e.target.files[0])} /></label>
      <button disabled={busy} className="btn btn-primary">{busy && <span className="loading loading-spinner" />}Save Changes</button>
    </form>
  );
}
