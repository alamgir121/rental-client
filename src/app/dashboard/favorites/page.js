"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";
import { Spinner, Table } from "@/components/ui";
import { api } from "@/lib/api";
import { money, notify } from "@/lib/utils";

function Favs() {
  const [items, setItems] = useState(null);
  useEffect(() => { api("/api/favorites").then(setItems); }, []);
  const remove = async (id) => {
    await api(`/api/favorites/${id}`, { method: "DELETE" });
    setItems(items.filter((i) => i._id !== id)); notify("success", "Removed from favorites");
  };
  if (!items) return <Spinner />;
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      <Table head={["Image", "Equipment", "Category", "Price", "Actions"]} empty="No favorites yet">
        {items.map((i) => (
          <tr key={i._id}>
            <td><img src={i.image} alt="" className="w-16 h-12 object-cover rounded" /></td><td className="font-medium">{i.name}</td><td>{i.category}</td><td>{money(i.price)}/{i.rentalType}</td>
            <td className="flex gap-2"><Link href={`/equipment/${i._id}`} className="btn btn-xs btn-primary">View Details</Link><button onClick={() => remove(i._id)} className="btn btn-xs btn-error btn-outline">Remove</button></td>
          </tr>
        ))}
      </Table>
    </>
  );
}
export default function Page() { return <PrivateRoute roles={["customer"]}><Favs /></PrivateRoute>; }
