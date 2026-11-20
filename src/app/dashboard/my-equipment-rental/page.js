"use client";
import { useEffect, useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import { Badge, Pagination, Spinner, Table } from "@/components/ui";
import { api } from "@/lib/api";
import { fmtDate, money } from "@/lib/utils";

function Rentals() {
  const [page, setPage] = useState(1);
  const [d, setD] = useState(null);
  useEffect(() => { setD(null); api(`/api/bookings/owner?page=${page}&limit=8`).then(setD); }, [page]);
  if (!d) return <Spinner />;
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">My Equipment Rental</h1>
      <Table head={["Customer", "Equipment", "Duration", "Qty", "Amount", "Payment", "Status"]} empty="No rentals yet">
        {d.items.map((b) => (
          <tr key={b._id}>
            <td><p className="font-medium">{b.customer.name}</p><p className="text-xs opacity-70">{b.customer.email} · {b.customer.phone}</p></td>
            <td>{b.equipmentName}</td><td>{fmtDate(b.startDate)} → {fmtDate(b.endDate)}</td><td>{b.quantity}</td><td>{money(b.totalAmount)}</td><td><Badge v={b.paymentStatus} /></td><td><Badge v={b.bookingStatus} /></td>
          </tr>
        ))}
      </Table>
      <Pagination page={d.page} pages={d.pages} onChange={setPage} />
    </>
  );
}
export default function Page() { return <PrivateRoute roles={["owner"]}><Rentals /></PrivateRoute>; }
