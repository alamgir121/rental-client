"use client";
import { useEffect, useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import EquipmentForm from "@/components/EquipmentForm";
import { Badge, Spinner, Table } from "@/components/ui";
import { api } from "@/lib/api";
import { confirmBox, money, notify } from "@/lib/utils";

function All() {
  const [items, setItems] = useState(null);
  const [edit, setEdit] = useState(null);
  const load = () => api("/api/admin/equipment").then(setItems);
  useEffect(() => { load(); }, []);
  const status = async (id, s) => { await api(`/api/admin/equipment/${id}/status`, { method: "PATCH", body: { status: s } }); notify("success", `Marked ${s}`); load(); };
  const del = async (id) => { if (await confirmBox("Delete this equipment?")) { await api(`/api/equipment/${id}`, { method: "DELETE" }); notify("success", "Deleted"); load(); } };
  if (!items) return <Spinner />;
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">All Equipment</h1>
      <Table head={["Equipment", "Owner", "Category", "Price", "Status", "Actions"]}>
        {items.map((i) => (
          <tr key={i._id}>
            <td className="font-medium">{i.name}</td><td>{i.owner?.email}</td><td>{i.category}</td><td>{money(i.price)}/{i.rentalType}</td><td><Badge v={i.status} /></td>
            <td className="flex gap-2 flex-wrap">
              <button disabled={i.status === "approved"} onClick={() => status(i._id, "approved")} className="btn btn-xs btn-success">Approve</button>
              <button disabled={i.status === "rejected"} onClick={() => status(i._id, "rejected")} className="btn btn-xs btn-warning">Reject</button>
              <button onClick={() => setEdit(i)} className="btn btn-xs btn-primary">Update</button>
              <button onClick={() => del(i._id)} className="btn btn-xs btn-error btn-outline">Delete</button>
            </td>
          </tr>
        ))}
      </Table>
      {edit && (
        <dialog className="modal modal-open"><div className="modal-box max-w-3xl">
          <h3 className="font-bold text-lg mb-3">Update {edit.name}</h3>
          <EquipmentForm initial={edit} submitText="Save changes" onSubmit={async (b) => { await api(`/api/equipment/${edit._id}`, { method: "PUT", body: b }); notify("success", "Updated"); setEdit(null); load(); }} />
          <div className="modal-action"><button className="btn" onClick={() => setEdit(null)}>Close</button></div>
        </div></dialog>
      )}
    </>
  );
}
export default function Page() { return <PrivateRoute roles={["admin"]}><All /></PrivateRoute>; }
