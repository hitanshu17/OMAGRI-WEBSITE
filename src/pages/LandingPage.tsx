import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import AboutSection from "../sections/AboutSection";
import BrandSection from "../sections/BrandSection";
import OurProducts from "../sections/OurProducts";
import ContactSection from "../sections/ContactSection";
import CustomerReviews from "../components/ui/Testimonials";
import { useScrollToHash } from "../hooks/useScrollToHash";
import FreshFruitHero from "../sections/FruitHeroSection";

const LandingPage = () => {
  useScrollToHash();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-white">
      {/* Hero carousal */}
      {/* <HeroSection /> */}
      <FreshFruitHero />

      {/* About Section */}
      <AboutSection />

      {/* Seasonal line-up */}
      <OurProducts />

      {/* Brand Section */}
      <BrandSection />

      {/* Testimonials */}
      <CustomerReviews />

      {/* Contact */}
      <ContactSection />
    </div>
  );
};

export default LandingPage;
