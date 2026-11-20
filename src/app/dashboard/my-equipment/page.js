"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";
import EquipmentForm from "@/components/EquipmentForm";
import { Badge, Spinner, Table } from "@/components/ui";
import { api } from "@/lib/api";
import { confirmBox, money, notify } from "@/lib/utils";

function Mine() {
  const [items, setItems] = useState(null);
  const [edit, setEdit] = useState(null);
  const load = () => api("/api/owner/equipment").then(setItems);
  useEffect(() => { load(); }, []);
  const del = async (id) => {
    if (!(await confirmBox("This equipment will be deleted permanently."))) return;
    await api(`/api/equipment/${id}`, { method: "DELETE" }); notify("success", "Deleted"); load();
  };
  if (!items) return <Spinner />;
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">My Equipment</h1>
      <Table head={["Equipment", "Category", "Price", "Quantity", "Status", "Actions"]} empty="You haven't added any equipment">
        {items.map((i) => (
          <tr key={i._id}>
            <td className="font-medium">{i.name}</td><td>{i.category}</td><td>{money(i.price)}/{i.rentalType}</td><td>{i.quantity}</td><td><Badge v={i.status} /></td>
            <td className="flex gap-2 flex-wrap">
              <Link href={`/equipment/${i._id}`} className="btn btn-xs">View Details</Link>
              <button onClick={() => setEdit(i)} className="btn btn-xs btn-primary">Update</button>
              <button onClick={() => del(i._id)} className="btn btn-xs btn-error btn-outline">Delete</button>
            </td>
          </tr>
        ))}
      </Table>
      {edit && (
        <dialog className="modal modal-open"><div className="modal-box max-w-3xl">
          <h3 className="font-bold text-lg mb-3">Update {edit.name}</h3>
          <EquipmentForm initial={edit} submitText="Save changes" onSubmit={async (b) => { await api(`/api/equipment/${edit._id}`, { method: "PUT", body: b }); notify("success", "Updated (sent for re-approval)"); setEdit(null); load(); }} />
          <div className="modal-action"><button className="btn" onClick={() => setEdit(null)}>Close</button></div>
        </div></dialog>
      )}
    </>
  );
}
export default function Page() { return <PrivateRoute roles={["owner"]}><Mine /></PrivateRoute>; }
