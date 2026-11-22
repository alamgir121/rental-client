"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { notify } from "@/lib/utils";

const target = () => new URLSearchParams(window.location.search).get("redirect") || "/";

export default function Login() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    setBusy(true);
    const { error } = await authClient.signIn.email({ email: fd.get("email"), password: fd.get("password") });
    setBusy(false);
    if (error) return notify("error", error.message || "Invalid email or password");
    notify("success", "Login successful");
    router.replace(target());
  };
  const google = () => authClient.signIn.social({ provider: "google", callbackURL: target() });
  return (
    <div className="page-wrap py-16 flex justify-center">
      <div className="w-full max-w-md bg-base-100 border border-base-300 rounded-2xl p-8 shadow-sm space-y-5">
        <h1 className="font-display text-3xl font-bold text-center">Welcome back</h1>
        <form onSubmit={submit} className="space-y-4" autoComplete="off">
          <input name="email" type="email" required placeholder="Email" autoComplete="off" className="input input-bordered w-full" />
          <input name="password" type="password" required placeholder="Password" autoComplete="new-password" className="input input-bordered w-full" />
          <button disabled={busy} className="btn btn-primary w-full">{busy && <span className="loading loading-spinner" />}Login</button>
        </form>
        <div className="divider">OR</div>
        <button onClick={google} className="btn btn-outline w-full">Continue with Google</button>
        <p className="text-center text-sm">New here? <Link href="/register" className="link link-primary">Create an account</Link></p>
      </div>
    </div>
  );
}
