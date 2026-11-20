"use client";
import { useEffect, useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import { Badge, Pagination, Spinner, Table } from "@/components/ui";
import { api } from "@/lib/api";
import { fmtDate, money } from "@/lib/utils";

function Rentals() {
  const [page, setPage] = useState(1);
  const [d, setD] = useState(null);
  useEffect(() => { setD(null); api(`/api/bookings/my?page=${page}&limit=8`).then(setD); }, [page]);
  if (!d) return <Spinner />;
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">My Rentals</h1>
      <Table head={["Equipment", "Start", "End", "Booked On", "Total", "Payment", "Status"]} empty="You have no rentals yet">
        {d.items.map((b) => (
          <tr key={b._id}><td className="font-medium">{b.equipmentName}</td><td>{fmtDate(b.startDate)}</td><td>{fmtDate(b.endDate)}</td><td>{fmtDate(b.createdAt)}</td><td>{money(b.totalAmount)}</td><td><Badge v={b.paymentStatus} /></td><td><Badge v={b.bookingStatus} /></td></tr>
        ))}
      </Table>
      <Pagination page={d.page} pages={d.pages} onChange={setPage} />
    </>
  );
}
export default function Page() { return <PrivateRoute roles={["customer"]}><Rentals /></PrivateRoute>; }
