"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./Providers";
import { Spinner } from "./ui";


export default function PrivateRoute({ roles, children }) {
  const { user, loading } = useAuth();
  const router =  useRouter();
  const path = usePathname();
  useEffect(() => {
    if (!loading && !user) router.replace(`/login?redirect=${encodeURIComponent(path)}`);
  }, [loading, user, path, router]);
  if (loading || !user) return <Spinner full />;
  if (roles && !roles.includes(user.role))
    return <div className="text-center py-20"><h2 className="text-2xl font-bold">403 – Access denied</h2><p className="opacity-70 mt-2">Your role ({user.role}) cannot view this page.</p></div>;
  return children;
}
