import fssai from "../../assets/images/fssai.png";
import logo from "../../assets/images/OAVLOGO.png";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Produce", href: "/produce" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Trade", href: "/terms-of-trade" },
];

const socialLinks = [
  { label: "LinkedIn", icon: FaLinkedinIn, href: "https://linkedin.com" },
  { label: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-white">
      {/* Main footer content */}
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-x-24">
          {/* Brand */}
          <div className="max-w-md">
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

                <p className="mt-4 text-sm leading-relaxed text-neutral-500 sm:text-base">
                  Delivering Nature's Luxury
                </p>

                {/* Social icons */}
                <div className="mt-6 flex items-center gap-3">
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
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#193768]">
              Menu
            </h3>
            <ul className="mt-4 space-y-3">
              {menuLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-neutral-600 transition-colors hover:text-[#1f3a2e] sm:text-base"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#193768]">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-neutral-600 transition-colors hover:text-[#1f3a2e] sm:text-base"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 border-t border-neutral-300/70 md:mx-10 lg:mx-16" />

      {/* Bottom bar */}
      <div className="px-6 py-6 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <span className="text-xs tracking-wide text-neutral-500">
            © {currentYear} OMM AGRI VILLA LLP. All Rights Reserved.
          </span>

          <img
            src={fssai}
            alt="FSSAI Certified"
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-md object-contain"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;