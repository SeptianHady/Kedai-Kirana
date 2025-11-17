import type { Metadata } from "next";
import localFont from "next/font/local";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { CartProvider } from "@/context/cartContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kedai Kirana",
  description: "Makanan rumahan khas Indonesia",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="d-flex flex-column min-vh-100"
        style={{
          backgroundColor: "#ecd134ff",
        }}
        >
          
        <CartProvider>
          <Navbar />

          <main className="flex-grow-1">
            {children}
          </main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
