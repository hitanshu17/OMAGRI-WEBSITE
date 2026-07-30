import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import CustomerReviews from "../components/ui/home/Testimonials";
import MissionVision from "../components/ui/home/MissionVision";
import FruitFamily from "../components/ui/home/FruitFamily";
import AboutSection from "../components/ui/home/AboutSection";
import PartnerBrands from "../components/ui/home/BrandsSection";
import HeroCarousel from "../components/ui/home/HeroSection";

const HomePage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-white">
      {/* Hero carousal */}
      <HeroCarousel />

      {/* About Section */}
      <AboutSection />

      {/* Mission Vision */}
      <MissionVision />

      {/* Seasonal line-up */}
      <FruitFamily />

      {/* Partner brand */}
      <PartnerBrands />

      {/* Testimonials */}
      <CustomerReviews />
    </div>
  );
};

export default HomePage;
