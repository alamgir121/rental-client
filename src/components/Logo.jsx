import Link from "next/link";
import { Wrench } from "lucide-react";
export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl">
      <span className="bg-primary text-primary-content p-2 rounded-lg"><Wrench size={20} /></span>
      <span>Rent<span className="text-primary">Ease</span></span>
    </Link>
  );
}
