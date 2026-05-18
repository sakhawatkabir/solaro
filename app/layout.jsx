import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import { CartProvider } from "./context/CartContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

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

export const metadata = {
  title: "SOLARO — Solar Energy for Bangladesh",
  description:
    "Premium solar panels and complete home kits for Bangladeshi families. Cut your electricity bill by 70%, beat load shedding, with free delivery and installation across all 64 districts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <CartProvider>
            <Navigation />
            <main className="min-h-screen bg-cream font-body">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
