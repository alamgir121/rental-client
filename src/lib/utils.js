import Swal from "sweetalert2";

export const CATEGORIES = ["Construction Equipment", "Photography Equipment", "Vehicles & Transportation", "Agriculture Equipment", "Electronics", "Event Equipment"];
export const RENTAL_TYPES = ["daily", "weekly", "monthly"];
export const money = (n) => `$${Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
export const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—");

export function notify(icon, title) {
  Swal.fire({ toast: true, position: "top-end", icon, title, timer: 2800, showConfirmButton: false, timerProgressBar: true });
}
export const confirmBox = (text) =>
  Swal.fire({ title: "Are you sure?", text, icon: "warning", showCancelButton: true, confirmButtonColor: "#d97706" }).then((r) => r.isConfirmed);


export function rentalTotal(price, rentalType, start, end, qty) {
  if (!start || !end || new Date(end) < new Date(start)) return 0;
  const days = Math.max(1, Math.round((new Date(end) - new Date(start)) / 86400000) + 1);
  const units = rentalType === "weekly" ? Math.ceil(days / 7) : rentalType === "monthly" ? Math.ceil(days / 30) : days;
  return +(price * units * qty).toFixed(2);
}
export async function uploadImage(file) {
  const fd = new FormData();
  fd.append("image", file);
  const r = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, { method: "POST", body: fd });
  const j = await r.json();
  if (!j.success) throw new Error("Image upload failed");
  return j.data.url;
}
export const FALLBACK_REVIEWS = [
  { name: "Rafiq Ahmed", rating: 5, comment: "Rented a concrete mixer for a weekend. Smooth booking, fair price and the owner was very helpful." },
  { name: "Hossain", rating: 5, comment: "Found a professional camera kit within minutes. Payment was secure and pickup was hassle free." },
  { name: "Tanvir Hasan", rating: 4, comment: "Great marketplace for event gear. Delivery was on time and everything worked perfectly." },
  { name: "Rahman", rating: 5, comment: "As an owner I earn extra from idle machines. The dashboard makes tracking earnings easy." },
];
