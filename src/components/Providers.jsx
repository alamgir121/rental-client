"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import { api, setToken } from "@/lib/api";

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export default function Providers({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const t = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  const syncUser = useCallback(async (s) => {
    try {
      const r = await api("/api/auth/jwt", {
        method: "POST", auth: false,
        body: { email: s.user.email, name: s.user.name, photo: s.user.image },
      });
      setToken(r.token);
      setUser(r.user);
    } catch (e) {
      console.error(e);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  
  useEffect(() => {
    if (isPending) return;
    if (!session) { setToken(null); setUser(null); setLoading(false); return; }
    syncUser(session);
  }, [session, isPending, syncUser]);

  const logout = async () => { await authClient.signOut(); setToken(null); setUser(null); };
  const refreshUser = async () => session && syncUser(session);

  return <Ctx.Provider value={{ user, setUser, loading: loading || isPending, logout, refreshUser, role: user?.role }}>{children}</Ctx.Provider>;
}
