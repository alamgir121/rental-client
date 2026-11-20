import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-display font-bold text-primary">404</h1>
      <p className="text-xl mt-3">Oops! The page you are looking for does not exist.</p>
      <Link href="/" className="btn btn-primary mt-6">Back to Home</Link>
    </div>
  );
}
