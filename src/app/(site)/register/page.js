"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { notify } from "@/lib/utils";

export default function Register() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const password = fd.get("password");
    if (password.length < 6) return notify("error", "Password must be at least 6 characters");
    if (!/[A-Z]/.test(password)) return notify("error", "Password must contain an uppercase letter");
    if (!/[a-z]/.test(password)) return notify("error", "Password must contain a lowercase letter");
    setBusy(true);
    const { error } = await authClient.signUp.email({ name: fd.get("name"), email: fd.get("email"), password, image: fd.get("photo") });
    setBusy(false);
    if (error) return notify("error", error.message || "Registration failed");
    notify("success", "Registration successful");
    router.replace("/");
  };
  const google = () => authClient.signIn.social({ provider: "google", callbackURL: "/" });
  return (
    <div className="page-wrap py-16 flex justify-center">
      <div className="w-full max-w-md bg-base-100 border border-base-300 rounded-2xl p-8 shadow-sm space-y-5">
        <h1 className="font-display text-3xl font-bold text-center">Create your account</h1>
        <form onSubmit={submit} className="space-y-4" autoComplete="off">
          <input name="name" required placeholder="Full name" autoComplete="off" className="input input-bordered w-full" />
          <input name="email" type="email" required placeholder="Email" autoComplete="off" className="input input-bordered w-full" />
          <input name="photo" type="url" required placeholder="Photo URL (direct image link)" autoComplete="off" className="input input-bordered w-full" />
          <input name="password" type="password" required placeholder="Password" autoComplete="new-password" className="input input-bordered w-full" />
          <p className="text-xs opacity-60">Min 6 characters, with an uppercase and a lowercase letter.</p>
          <button disabled={busy} className="btn btn-primary w-full">{busy && <span className="loading loading-spinner" />}Register</button>
        </form>
        <div className="divider">OR</div>
        <button onClick={google} className="btn btn-outline w-full">Sign up with Google</button>
        <p className="text-center text-sm">Already registered? <Link href="/login" className="link link-primary">Login</Link></p>
      </div>
    </div>
  );
}
