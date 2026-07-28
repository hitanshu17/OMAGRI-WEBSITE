import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Navbar is fixed (68px) */}
      <main className="flex-1 pt-17">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
