"use client";
export default function Error({ error, reset }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold">Oops! An Unexpected Error Occurred</h1>
      <p className="opacity-70 mt-2">{error?.message}</p>
      <button onClick={reset} className="btn btn-primary mt-6">Try again</button>
    </div>
  );
}
