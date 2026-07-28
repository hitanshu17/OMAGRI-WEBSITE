import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Leaf } from "lucide-react";

import aboutUsHeader from "../assets/images/AboutUs.jpg";
import secImg from "../assets/images/TriasseaIcon.png";
import aboutFruitImg from "../assets/images/fruit-image.png";


const leaders = [
  {
    initials: "MG",
    name: "Mukesh Gaba",
    title: "Founder & Managing Partner",
    bio: "With decades of experience in the agri-trade sector, Mukesh leads sourcing and quality strategy across every partner farm we work with.",
  },
  {
    initials: "KG",
    name: "Kanav Gaba",
    title: "Partner, Operations",
    bio: "Kanav brings a modern perspective to the business, driving our expansion into new markets while staying true to our founding commitment to quality.",
  },
];

const features = [
  {
    title: "Generational experience",
    desc: "Deep-rooted knowledge of farming and produce trade, passed down and sharpened over decades.",
  },
  {
    title: "Direct imports",
    desc: "We source direct from growers and orchards, cutting out unnecessary middlemen.",
  },
  {
    title: "Premium quality",
    desc: "Strict quality control at every stage, from harvest through to final delivery.",
  },
  {
    title: "Strong network",
    desc: "An established network of growers, exporters and logistics partners spanning key regions.",
  },
  {
    title: "Reliable supply",
    desc: "Consistent availability of premium fruit, backed by careful sourcing and planning.",
  },
  {
    title: "Customer-first approach",
    desc: "Transparent pricing and dedicated support, tailored to how our partners actually work.",
  },
];

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
      {/* Hero */}
      <section className="relative h-[70vh] min-h-105 w-full overflow-hidden">
        <img
          src={aboutUsHeader}
          alt="OMM Agri Villa orchard"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative flex h-full flex-col justify-end px-6 pb-16 md:px-16">
          <span className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Our Story
          </span>
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-tight text-white md:text-6xl">
            Bringing the World's 
            <br className="hidden md:block" /> Finest Fruits to India.
          </h1>
        </div>
      </section>

      {/* About */}
      <section className="bg-[#faf7f1] px-6 py-20 md:px-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <span className="mb-3 flex items-center gap-2">
              <img className="w-6" src={secImg} alt="" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#d97b3c]">
                About Us
              </span>
            </span>
            <h2 className="mb-5 font-serif text-3xl font-bold text-[#16241b] md:text-4xl">
              About OMM AGRI VILLA LLP
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

      {/* Quote band */}
      <section className="bg-[#16241b] px-6 py-16 text-center">
        <img src={secImg} className="mx-auto mb-4 w-10" alt="" />
        <p className="mx-auto max-w-2xl font-serif text-2xl italic text-white md:text-3xl">
          &ldquo;Global Fruits, Trusted Quality&rdquo;
        </p>
        <div className="mx-auto mt-6 h-0.5 w-16 bg-[#d97b3c]" />
      </section>

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
