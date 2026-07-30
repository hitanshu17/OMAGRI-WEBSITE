import HeroSection from "../components/shared/HeroSection"
import PresenceInIndia from "../components/ui/network/Presence";
import aboutUsHeader from "../assets/images/bread.jpg";
import map from "../assets/images/world-map.jpg";
import indiaMap from "../assets/images/india-map.png"

const NetworkPage = () => {
  return (
    <div className="bg-white">
      <HeroSection
        image={aboutUsHeader}
        imageAlt="Assorted fresh fruit"
        title="Our Network"
        breadcrumbs={[
          { label: "OMM Agri Villa", href: "/" },
          { label: "Our Network" },
        ]}
      />

      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Our Network
          </h2>

          <p className="mt-8 text-base leading-relaxed text-gray-500 sm:text-lg">
            In order to become the most dependable business partner for our
            suppliers throughout the world, RB Fruitech Pvt. Ltd. aims to
            deliver an exceptional client experience.
          </p>

          <p className="mt-6 text-base leading-relaxed text-gray-500 sm:text-lg">
            By keeping the cost of imported fresh fruits affordable while
            retaining their exceptional quality, our company&apos;s mission is
            to combine a perfect balance of client happiness. In order to ensure
            environmental purity and excellent health, we encourage sustainable
            agriculture methods among our farmers and suppliers.
          </p>
        </div>
        <img src={map} />
      </section>

      <PresenceInIndia
      eyebrow="Presence"
      heading="RB Fruitech in India"
      listLabel="States Covered"
      image={indiaMap}   // <- swap in your own illustration
      imageAlt="Illustrated map of India with cultural icons"
    />
    </div>
  );
}

export default NetworkPage