"use client";
import { useEffect, useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/components/Providers";
import { Spinner, Table } from "@/components/ui";
import { api } from "@/lib/api";
import { confirmBox, fmtDate, notify } from "@/lib/utils";

function Users() {
  const { user: me } = useAuth();
  const [users, setUsers] = useState(null);
  const load = () => api("/api/admin/users").then(setUsers);
  useEffect(() => { load(); }, []);
  const role = async (id, r) => { await api(`/api/admin/users/${id}/role`, { method: "PATCH", body: { role: r } }); notify("success", "Role updated"); load(); };
  const del = async (id) => { if (await confirmBox("This user will be removed.")) { await api(`/api/admin/users/${id}`, { method: "DELETE" }); notify("success", "User removed"); load(); } };
  if (!users) return <Spinner />;
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <Table head={["Name", "Email", "Role", "Registered", "Actions"]}>
        {users.map((u) => (
          <tr key={u._id}>
            <td className="font-medium">{u.name}</td><td>{u.email}</td>
            <td><select disabled={u._id === me.id || u._id === me._id} className="select select-bordered select-sm capitalize" value={u.role} onChange={(e) => role(u._id, e.target.value)}>
              {["customer", "owner", "admin"].map((r) => <option key={r}>{r}</option>)}</select></td>
            <td>{fmtDate(u.createdAt)}</td>
            <td><button disabled={u._id === me._id} onClick={() => del(u._id)} className="btn btn-xs btn-error btn-outline">Remove</button></td>
          </tr>
        ))}
      </Table>
    </>
  );
}
export default function Page() { return <PrivateRoute roles={["admin"]}><Users /></PrivateRoute>; }
