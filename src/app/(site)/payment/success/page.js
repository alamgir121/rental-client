"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import PrivateRoute from "@/components/PrivateRoute";
import { Spinner } from "@/components/ui";
import { api } from "@/lib/api";

function Success() {
  const [state, setState] = useState("loading");
  const [msg, setMsg] = useState("");
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return; ran.current = true;
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) { setState("error"); setMsg("Missing payment session."); return; }
    api("/api/payments/confirm", { method: "POST", body: { sessionId } })
      .then(() => setState("ok")).catch((e) => { setState("error"); setMsg(e.message); });
  }, []);
  if (state === "loading") return <Spinner full />;
  return (
    <div className="page-wrap py-24 text-center space-y-4">
      {state === "ok" ? <CheckCircle2 className="mx-auto text-success" size={72} /> : <XCircle className="mx-auto text-error" size={72} />}
      <h1 className="font-display text-3xl font-bold">{state === "ok" ? "Payment successful!" : "Payment could not be confirmed"}</h1>
      <p className="opacity-70">{state === "ok" ? "Your booking is confirmed and the transaction has been recorded." : msg}</p>
      <Link href="/dashboard/my-rentals" className="btn btn-primary">Go to My Rentals</Link>
    </div>
  );
}
export default function Page() { return <PrivateRoute><Success /></PrivateRoute>; }
