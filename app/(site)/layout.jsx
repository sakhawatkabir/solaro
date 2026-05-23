import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

export default function SiteLayout({ children }) {
  return (
    <>
      <Navigation />
      <CartDrawer />
      <main>{children}</main>
      <Footer />
    </>
  );
}
