import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";

import { useLocation } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaPhoneVolume,
} from "react-icons/fa";

import fruits from "../assets/images/Partner-fruits.png";

const stats = [
  { value: "12+", label: "States Reached" },
  { value: "250", label: "Partner Farms" },
  { value: "45k", label: "Tons Exported" },
  { value: "24/7", label: "Logistics Support" },
];

const PartnerWithUsPage = () => {
  const { pathname } = useLocation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Sourcing Inquiry",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire up to your inquiry endpoint
    console.log("Inquiry submitted:", form);
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#f1ebe0] px-6 pb-16 pt-16 md:px-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4d6a3f]">
              Connect With OMM Agri
            </span>
            <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-[#16241b] md:text-5xl">
              Let&rsquo;s Cultivate a Partnership Grounded in Trust.
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-gray-600">
              Whether you are a local grower looking for national reach or a
              distributor seeking the finest harvest, our team in Delhi is
              ready to facilitate your journey.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#inquiry-form"
                className="rounded-lg bg-[#16241b] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#233828]"
              >
                Start Inquiry
              </a>
              <a
                href="tel:+912223456789"
                className="flex items-center gap-2 rounded-lg border border-black/15 px-6 py-3 text-sm font-medium text-[#16241b] transition hover:bg-black/5"
              >
                <FaPhoneVolume className="text-xs" />
                Call Desk
              </a>
            </div>
          </div>

          <div className="relative">
            <img
              src={fruits}
              alt="Fresh grapes and citrus at OMM Agri"
              className="h-80 w-full rounded-2xl object-cover shadow-xl md:h-96"
            />
            <div className="absolute -bottom-6 left-6 w-64 rounded-xl bg-white p-5 shadow-lg">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#4d6a3f]">
                Operational Hours
              </span>
              <p className="mt-1 font-serif text-lg font-bold text-[#16241b]">
                09:00 — 18:00
              </p>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">
                Monday through Saturday, closed on Sundays and Public Holidays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Headquarters + Form */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
          {/* Headquarters info */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#16241b] md:text-3xl">
              Headquarters
            </h2>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#16241b] text-white">
                  <FaMapMarkerAlt className="text-sm" />
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#4d6a3f]">
                    Visit Us
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    Shop No 18 Blocl 19 Chhotis Mandi Janakpuri Janakpuri B-1 
                    <br />
                    New Delhi West Delhi Delhi 110058
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#16241b] text-white">
                  <FaEnvelope className="text-sm" />
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#4d6a3f]">
                    Email Us
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    ommagrivilla@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#16241b] text-white">
                  <FaPhoneAlt className="text-sm" />
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#4d6a3f]">
                    Call Us
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    +91 (22) 2345 6789
                    <br />
                    +91 (22) 2345 6790
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry form */}
          <div
            id="inquiry-form"
            className="rounded-2xl border border-black/5 bg-[#faf7f1] p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                    className="mt-2 w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-[#16241b] placeholder:text-gray-400 focus:border-[#16241b] focus:outline-none"
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
                    className="mt-2 w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-[#16241b] placeholder:text-gray-400 focus:border-[#16241b] focus:outline-none"
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
                  className="mt-2 w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-[#16241b] focus:border-[#16241b] focus:outline-none"
                >
                  <option>Sourcing Inquiry</option>
                  <option>Distribution Partnership</option>
                  <option>Export Inquiry</option>
                  <option>General Question</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-[#4d6a3f]">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your requirement in detail…"
                  className="mt-2 w-full resize-none rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-[#16241b] placeholder:text-gray-400 focus:border-[#16241b] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-[#16241b] py-3 text-sm font-medium text-white transition hover:bg-[#233828]"
              >
                Send Inquiry
              </button>
              <p className="text-center text-xs text-gray-400">
                By clicking send, you agree to our privacy policy regarding data
                handling.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Strategic Hub / Map */}
      <section className="px-6 pb-20 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-2 border-b border-black/10 pb-4 sm:flex-row sm:items-center">
            <h2 className="font-serif text-2xl font-bold text-[#16241b] md:text-3xl">
              Strategic Hub: Delhi
            </h2>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4d6a3f]">
              Coordinates: 19.0760° N, 72.8777° E
            </span>
          </div>

          <div className="relative mt-8 h-105 w-full overflow-hidden rounded-2xl bg-[#c9c9c4]">
            {/* Stylised map pattern */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 800 500"
              preserveAspectRatio="xMidYMid slice"
            >
              <rect width="800" height="500" fill="#cfcfc9" />
              {Array.from({ length: 17 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={i * 50}
                  y1="0"
                  x2={i * 50}
                  y2="500"
                  stroke="#b8b8b1"
                  strokeWidth="2"
                />
              ))}
              {Array.from({ length: 11 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={i * 50}
                  x2="800"
                  y2={i * 50}
                  stroke="#b8b8b1"
                  strokeWidth="2"
                />
              ))}
              {[
                [120, 90, 60, 40],
                [260, 160, 90, 60],
                [420, 80, 70, 50],
                [560, 220, 100, 70],
                [180, 300, 80, 50],
                [400, 340, 110, 60],
                [600, 100, 60, 40],
              ].map(([x, y, w, h], i) => (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  fill="#a8a8a0"
                  rx="4"
                />
              ))}
              <circle cx="430" cy="250" r="10" fill="#d97b3c" />
              <circle cx="430" cy="250" r="18" fill="#d97b3c" opacity="0.3" />
            </svg>

            {/* Info card top-left */}
            <div className="absolute left-6 top-6 w-56 rounded-lg bg-white/95 p-4 shadow-md">
              <p className="text-xs font-bold text-[#16241b]">
                OMM AGRI VILLA LLP
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-gray-600">
                Shop No 18 Blocl 19 Chhotis Mandi Janakpuri Janakpuri B-1
                <br />
                New Delhi West Delhi Delhi 110058
              </p>
              <p className="mt-2 text-[11px] text-gray-600">
                Tel: +91 22 6103 4567
              </p>
              <button className="mt-3 rounded-md border border-black/10 px-3 py-1 text-[10px] font-medium text-[#16241b]">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-[#16241b] px-6 py-14 md:px-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-3xl font-bold text-[#d97b3c] md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PartnerWithUsPage;
