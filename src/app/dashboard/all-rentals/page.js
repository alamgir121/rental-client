"use client";
import { useEffect, useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import { Badge, Pagination, Spinner, Table } from "@/components/ui";
import { api } from "@/lib/api";
import { fmtDate, money } from "@/lib/utils";

function All() {
  const [page, setPage] = useState(1);
  const [d, setD] = useState(null);
  useEffect(() => { setD(null); api(`/api/admin/bookings?page=${page}&limit=8`).then(setD); }, [page]);
  if (!d) return <Spinner />;
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">All Rentals</h1>
      <Table head={["Customer", "Owner", "Equipment", "Duration", "Amount", "Payment", "Status"]}>
        {d.items.map((b) => (
          <tr key={b._id}>
            <td><p className="font-medium">{b.customer.name}</p><p className="text-xs opacity-70">{b.customer.email}</p></td>
            <td><p className="font-medium">{b.owner?.name}</p><p className="text-xs opacity-70">{b.owner?.email}</p></td>
            <td>{b.equipmentName}</td><td>{fmtDate(b.startDate)} → {fmtDate(b.endDate)}</td><td>{money(b.totalAmount)}</td><td><Badge v={b.paymentStatus} /></td><td><Badge v={b.bookingStatus} /></td>
          </tr>
        ))}
      </Table>
      <Pagination page={d.page} pages={d.pages} onChange={setPage} />
    </>
  );
}
export default function Page() { return <PrivateRoute roles={["admin"]}><All /></PrivateRoute>; }
