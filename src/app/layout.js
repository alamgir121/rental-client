import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = { title: "RentEase – Equipment Rental Platform", description: "Rent equipment from verified owners. Secure payments, flexible periods." };

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
