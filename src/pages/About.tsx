import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Leaf } from "lucide-react";

import aboutUsHeader from "../assets/images/bread.jpg";
import aboutFruitImg from "../assets/images/fruit-image.png";
import HeroSection from "../components/ui/about/AboutHero";
import { features, leaders } from "../data/aboutContent";
import MissionVisionSimple from "../components/ui/about/Missionvisionsimple";

const About = () => {
  const [, setScreenWidth] = useState(window.innerWidth);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-white">
      <HeroSection
        image={aboutUsHeader}
        imageAlt="Assorted fresh fruit"
        title="About Us"
        breadcrumbs={[
          { label: "R B Fruitech", href: "/" },
          { label: "About Us" },
        ]}
      />

      {/* About */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-5 text-3xl font-bold text-[#16241b] md:text-4xl">
              Our Story
            </h2>
            <p className="mb-4 leading-relaxed text-gray-500">
              OMM AGRI VILLA LLP stands as a premier trusted importer and trader
              of premium global fruits. Rooted in a true dedication to integrity
              and excellence, we are able to prioritize the finest produce from
              international orchards to serve the diverse needs of the Indian
              market.
            </p>
            <p className="leading-relaxed text-gray-500">
              Our philosophy combines the traditional value of honesty and
              commitment with modern, forward-looking techniques. Adopting the
              gap between physical growers and local distributors, one trusted
              relationship at a time.
            </p>
          </div>
          <div className="relative">
            <img
              src={aboutFruitImg}
              alt="Fresh fruit sourced by OMM Agri Villa"
              className="w-full rounded-lg object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      <MissionVisionSimple />

      {/* Leadership & Vision */}
      <section className="bg-white px-6 py-20 md:px-16">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-3 font-serif text-3xl font-bold text-[#16241b] md:text-4xl">
            Leadership &amp; Vision
          </h2>
          <p className="text-gray-500">
            Guiding the next generation of agri-trade with a lasting commitment
            to national expansion.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="rounded-xl border border-black/5 bg-[#faf7f1] p-8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#16241b] font-serif text-white">
                {leader.initials}
              </div>
              <h3 className="text-lg font-semibold text-[#16241b]">
                {leader.name}
              </h3>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#d97b3c]">
                {leader.title}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {leader.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* Why Industry Leaders Choose Us */}
      <section className="bg-[#faf7f1] px-6 py-20 md:px-16">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#d97b3c]">
            The OMM Advantage
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[#16241b] md:text-4xl">
            Why Industry Leaders Choose Us
          </h2>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={feature.title}>
              <span className="text-xs font-medium text-gray-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 mt-2 text-lg font-semibold text-[#16241b]">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* CTA */}
      <section className="bg-[#16241b] px-6 py-20 text-center">
        <Leaf className="mx-auto mb-4 text-2xl text-[#d97b3c]" />
        <h2 className="mb-4 font-serif text-3xl font-bold text-white md:text-4xl">
          Ready to grow with us?
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-white/70">
          Join our network of premium fruit distributors and experience the OMM
          standard of excellence.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="/partner-with-us"
            className="rounded-lg bg-[#d97b3c] px-8 py-3 font-medium text-white transition hover:bg-[#c26a2e]"
          >
            Enquire Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
