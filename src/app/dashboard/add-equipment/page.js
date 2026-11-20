"use client";
import PrivateRoute from "@/components/PrivateRoute";
import EquipmentForm from "@/components/EquipmentForm";
import { useAuth } from "@/components/Providers";
import { api } from "@/lib/api";
import { notify } from "@/lib/utils";
import { useRouter } from "next/navigation";

function Add() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <>
      <h1 className="text-2xl font-bold mb-1">Add Equipment</h1>
      <p className="text-sm opacity-70 mb-4">Listing as <b>{user.name}</b> ({user.email}). New listings start as <b>pending</b> until an admin approves.</p>
      <EquipmentForm submitText="Add Equipment" onSubmit={async (b) => { await api("/api/owner/equipment", { method: "POST", body: b }); notify("success", "Equipment submitted for approval"); router.push("/dashboard/my-equipment"); }} />
    </>
  );
}
export default function Page() { return <PrivateRoute roles={["owner"]}><Add /></PrivateRoute>; }
