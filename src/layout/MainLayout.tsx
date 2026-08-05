import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollHomeButton, { FabStack, ImageFab } from "../components/shared/ScrollHomeButton";

import hayat from "../assets/images/Big-Kiwi.png";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Navbar is fixed (68px) */}
      <main className="flex-1 pt-17">
        <Outlet />
      </main>

      <Footer />

      <FabStack>
        <ImageFab
          src={hayat}
          alt="Hayat Kiwi"
          onClick={() => window.open("/hayat-kiwi", "_blank", "noopener,noreferrer")}
        />
        <ScrollHomeButton />
      </FabStack>
    </div>
  );
};

export default MainLayout;
