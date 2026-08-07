import fssai from "../../assets/images/fssai.png";
import logo from "../../assets/images/OAVLOGO.png";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Produce", href: "/produce" },
  { label: "Hayat Kiwi", href: "/hayat-kiwi" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "LinkedIn", icon: FaLinkedinIn, href: "https://linkedin.com" },
  { label: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/ommagrivilla" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-white">
      {/* Main footer content */}
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-start gap-4">
              <img
                src={logo}
                alt="Omm Agri Villa LLP logo"
                className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
              />
              <div className="flex flex-col">
                <h2 className="text-xl font-bold leading-tight tracking-tight text-[#193768] sm:text-2xl">
                  OMM AGRI VILLA LLP
                </h2>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1f3a2e]">
                  Delivering Nature&apos;s Luxury
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-neutral-500 sm:text-base">
              Premium, sustainably grown produce — from orchard to your table.
            </p>

            {/* Social icons */}
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition-colors hover:border-[#1f3a2e] hover:text-[#1f3a2e]"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#193768]">
              Menu
            </h3>
            <ul className="mt-5 space-y-3.5">
              {menuLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group inline-flex items-center text-sm text-neutral-600 sm:text-base"
                  >
                    <span className="relative transition-colors group-hover:text-[#1f3a2e]">
                      {label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#1f3a2e] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Certification */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#193768]">
              Certified Quality
            </h3>
            <div className="mt-5 flex items-center gap-4">
              <img
                src={fssai}
                alt="FSSAI Certified"
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-md border border-neutral-200 object-contain p-1"
              />
              <p className="text-sm leading-snug text-neutral-500">
                FSSAI certified,
                <br />
                trusted quality
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 border-t border-neutral-300/70 md:mx-10 lg:mx-16" />

      {/* Bottom bar */}
      <div className="px-6 py-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl text-center">
          <span className="text-xs tracking-wide text-neutral-500">
            © {currentYear} OMM AGRI VILLA LLP. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;