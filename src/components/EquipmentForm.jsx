"use client";
import { useState } from "react";
import { CATEGORIES, RENTAL_TYPES, uploadImage, notify } from "@/lib/utils";

const blank = { name: "", description: "", category: CATEGORIES[0], location: "", price: "", rentalType: "daily", quantity: 1, condition: "Good", brand: "", model: "", image: "", terms: "" };

export default function EquipmentForm({ initial, onSubmit, submitText = "Submit", showStatus = true }) {
  const [f, setF] = useState({ ...blank, ...initial });
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      let image = f.image;
      if (f.file) image = await uploadImage(f.file);
      if (!image) throw new Error("Please upload an equipment image");
      const { file, ...rest } = f;
      await onSubmit({ ...rest, image });
    } catch (err) { notify("error", err.message); }
    setBusy(false);
  };
  const Field = ({ label, children, full }) => (
    <label className={`form-control ${full ? "md:col-span-2" : ""}`}><span className="label-text mb-1">{label}</span>{children}</label>
  );
  const inp = "input input-bordered w-full";
  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-4 bg-base-100 border border-base-300 rounded-xl p-5 md:p-6">
      <Field label="Equipment Name"><input required className={inp} value={f.name} onChange={set("name")} /></Field>
      <Field label="Category"><select className="select select-bordered w-full" value={f.category} onChange={set("category")}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></Field>
      <Field label="Location"><input required className={inp} value={f.location} onChange={set("location")} /></Field>
      <Field label="Rental Price (USD)"><input required type="number" min="1" className={inp} value={f.price} onChange={set("price")} /></Field>
      <Field label="Rental Type"><select className="select select-bordered w-full capitalize" value={f.rentalType} onChange={set("rentalType")}>{RENTAL_TYPES.map((c) => <option key={c}>{c}</option>)}</select></Field>
      <Field label="Available Quantity"><input required type="number" min="1" className={inp} value={f.quantity} onChange={set("quantity")} /></Field>
      <Field label="Equipment Condition"><select className="select select-bordered w-full" value={f.condition} onChange={set("condition")}>{["New", "Like New", "Good", "Fair"].map((c) => <option key={c}>{c}</option>)}</select></Field>
      <Field label="Brand"><input required className={inp} value={f.brand} onChange={set("brand")} /></Field>
      <Field label="Model"><input required className={inp} value={f.model} onChange={set("model")} /></Field>
      <Field label="Equipment Image (imgbb upload)">
        <input type="file" accept="image/*" className="file-input file-input-bordered w-full" onChange={(e) => setF({ ...f, file: e.target.files[0] })} />
      </Field>
      <Field label="Description" full><textarea required rows={3} className="textarea textarea-bordered" value={f.description} onChange={set("description")} /></Field>
      <Field label="Rental Terms and Conditions" full><textarea required rows={3} className="textarea textarea-bordered" value={f.terms} onChange={set("terms")} /></Field>
      {showStatus && <Field label="Status"><input disabled className={inp} value={initial?.status || "pending"} /></Field>}
      <div className="md:col-span-2"><button disabled={busy} className="btn btn-primary">{busy && <span className="loading loading-spinner" />}{submitText}</button></div>
    </form>
  );
}
