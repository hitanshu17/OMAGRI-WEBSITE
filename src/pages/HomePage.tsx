import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import { useLocation } from "react-router-dom";
import {
  FaSeedling,
  FaCheckCircle,
  FaSnowflake,
  FaTruck,
  FaComments,
  FaHandshake,
  FaShippingFast,
  FaArrowRight,
} from "react-icons/fa";
import apple from "../assets/images/apple-fruit.jpg";
import orange from "../assets/images/orange-fruit.avif";
import kiwi from "../assets/images/kiwi-fruit.jpeg";
import grape from "../assets/images/grape-fruit.jpg";
import pears from "../assets/images/pears.jpg";
import avacado from "../assets/images/avacado-fruit.jpg";

const credentials = [
  { value: "5", label: "Years Sourcing Experience" },
  { value: "2", label: "Countries Served" },
  { value: "15", label: "Grower Partnerships" },
];

const seasonFruits = [
  {
    name: "Table Apples",
    variety: "Gala · Fuji · Pink Lady",
    desc: "Crisp, high-altitude apples with excellent shelf life and durability.",
    image: apple,
  },
  {
    name: "Table Grapes",
    variety: "Thompson · Crimson",
    desc: "Seedless varieties sourced fresh off premium vines.",
    image: grape,
  },
  {
    name: "Zesty Kiwis",
    variety: "Zespri Gold",
    desc: "Gold and green varieties with rich antioxidant density.",
    image: kiwi,
  },
  {
    name: "Heritage Pears",
    variety: "Packham · Anjou",
    desc: "Firm-fleshed pears built for long-distance travel.",
    image: pears,
  },
  {
    name: "Juicy Oranges",
    variety: "Bing · Rainier",
    desc: "Juicy flavoured oranges handled under strict cold chain.",
    image: orange,
  },
  {
    name: "Avocados",
    variety: "Hass Premium",
    desc: "Creamy Hass avocados sourced for consistent ripeness.",
    image: avacado,
  },
];

const supplySteps = [
  {
    icon: FaSeedling,
    title: "Farm Selection",
    desc: "Every partner orchard is vetted for soil quality, practice and yield consistency.",
  },
  {
    icon: FaCheckCircle,
    title: "Quality Grading",
    desc: "Produce is sorted and graded against strict export benchmarks before dispatch.",
  },
  {
    icon: FaSnowflake,
    title: "Cold-Chain Storage",
    desc: "Temperature-controlled handling preserves freshness from orchard to warehouse.",
  },
  {
    icon: FaTruck,
    title: "Pan-India Delivery",
    desc: "A logistics network built to move fresh produce fast, anywhere in the country.",
  },
];

const advantages = [
  {
    icon: FaComments,
    title: "Proactive Communication",
    desc: "Our team in Mumbai keeps you updated at every stage, no chasing required.",
  },
  {
    icon: FaHandshake,
    title: "Trusted Network",
    desc: "Long-standing relationships with growers and exporters across key regions.",
  },
  {
    icon: FaShippingFast,
    title: "Reliable Logistics",
    desc: "Consistent, on-time delivery backed by a carefully managed cold chain.",
  },
];

const initialForm = {
  name: "",
  email: "",
  subject: "Sourcing Inquiry",
  message: "",
};

const HomePage = () => {
  const { pathname } = useLocation();
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: wire up to your inquiry endpoint
    console.log("Call scheduled:", form);

    setForm(initialForm);
  };

  return (
    <div className="bg-white">
      {/* Local keyframes for the hero fruit animation */}
      <style>{`
        @keyframes omm-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        .omm-float {
          animation: omm-float 4.5s ease-in-out infinite;
        }
      `}</style>

      {/* Hero */}
      <section
        id="hero"
        className="relative overflow-hidden px-6 py-24 md:px-16 md:py-32"
      >
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/Fruits.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for text contrast */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#e9c9a3]">
            A New Standard, Sourced
          </span>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
            Precision Sourced.
            <br />
            <span className="italic text-[#d97b3c]">Globally Grown.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-white/80">
            We specialize in sourcing the finest quality apples, kiwis, pears,
            cherries, avocados, citrus fruits, grapes, and other fresh produce
            from leading growers across the world.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/partner-with-us"
              className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-[#16241b] transition hover:bg-white/90"
            >
              Start Sourcing
            </a>
            <a
              href="/our-fruits"
              className="rounded-lg border border-white/40 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Explore Sourcing
            </a>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="px-6 py-14 md:px-16">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row md:items-center">
          <p className="max-w-sm text-gray-600">
            Our credentials are transparent, and the results speak for
            themselves.
          </p>
          <div className="flex gap-10">
            {credentials.map((c) => (
              <div key={c.label}>
                <p className="font-serif text-3xl font-bold text-[#16241b]">
                  {c.value}
                </p>
                <p className="mt-1 max-w-32 text-xs text-gray-500">
                  {c.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal line-up */}
      <section id="season" className="px-6 pb-20 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#4d6a3f]">
                The Season Line-Up
              </span>
              <h2 className="mt-2 font-serif text-2xl font-bold text-[#16241b] md:text-3xl">
                This Season&rsquo;s Best
              </h2>
            </div>
            <a
              href="/our-fruits"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d97b3c]"
            >
              View Full Season Calendar
              <FaArrowRight className="text-[10px]" />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {seasonFruits.map((fruit) => (
              <div
                key={fruit.name}
                className="group relative flex min-h-50 flex-col justify-end overflow-hidden rounded-2xl bg-cover bg-center p-6"
                style={{ backgroundImage: `url(${fruit.image})` }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent" />

                <div className="relative">
                  <h3 className="font-semibold text-white">{fruit.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {fruit.desc}
                  </p>
                  <span className="mt-3 block text-[11px] font-semibold uppercase tracking-widest text-[#d97b3c]">
                    {fruit.variety}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supply chain */}
      <section className="bg-[#16241b] px-6 py-20 md:px-16">
        <div className="mx-auto max-w-6xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#d97b3c]">
            The Supply Chain
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-white md:text-4xl">
            Integrated Logistics Excellence
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-10 text-left sm:grid-cols-2 lg:grid-cols-4">
            {supplySteps.map((step, i) => (
              <div key={step.title}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d97b3c]/15 text-sm font-semibold text-[#d97b3c]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <step.icon className="mb-2 mt-4 text-xl text-[#d97b3c]" />
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OMM Advantage */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-6xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#4d6a3f]">
            The OMM Advantage
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[#16241b] md:text-4xl">
            Reliability as a Core Product
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((adv) => (
              <div
                key={adv.title}
                className="rounded-2xl border border-black/5 bg-[#faf7f1] p-8"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#16241b] text-white">
                  <adv.icon className="text-sm" />
                </span>
                <h3 className="mt-4 font-semibold text-[#16241b]">
                  {adv.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA + mini form */}
      <section id="inquiry" className="bg-[#16241b] px-6 py-20 md:px-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
              Ready to secure your supply chain?
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-white/60">
              Tell us what you&rsquo;re looking to source, and our Mumbai team
              will get back to you within one business day.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-[#4d6a3f]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="mt-2 w-full rounded-lg border border-black/10 bg-[#faf7f1] px-4 py-2.5 text-sm text-[#16241b] placeholder:text-gray-400 focus:border-[#16241b] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-[#4d6a3f]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="mt-2 w-full rounded-lg border border-black/10 bg-[#faf7f1] px-4 py-2.5 text-sm text-[#16241b] placeholder:text-gray-400 focus:border-[#16241b] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-[#4d6a3f]">
                  Subject
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-black/10 bg-[#faf7f1] px-4 py-2.5 text-sm text-[#16241b] focus:border-[#16241b] focus:outline-none"
                >
                  <option>Sourcing Inquiry</option>
                  <option>Distribution Partnership</option>
                  <option>Export Inquiry</option>
                  <option>General Question</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-[#4d6a3f]">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe your requirement in detail…"
                  className="mt-2 w-full resize-none rounded-lg border border-black/10 bg-[#faf7f1] px-4 py-2.5 text-sm text-[#16241b] placeholder:text-gray-400 focus:border-[#16241b] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-[#d97b3c] py-3 text-sm font-medium text-white transition hover:bg-[#c26a2e]"
              >
                Schedule a Call
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
