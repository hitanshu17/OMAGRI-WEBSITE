import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

const footerColumns = [
  {
    heading: "Catalog",
    links: ["Our Produce"],
  },
  {
    heading: "Company",
    links: ["About Us", "Our Sourcing"],
  },
  {
    heading: "Inquiry",
    links: ["Partner With Us", "Contact Support", "Privacy Policy"],
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#eef1e2] px-6 pb-8 pt-14 md:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 border-b border-black/10 pb-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <h5 className="font-serif text-lg font-bold text-[#16241b]">
            OMM AGRI VILLA LLP
          </h5>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-600">
            Stands for Global Fruits, Trusted Quality, delivering freshness, reliability, and excellence with every shipment.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-[#16241b] transition hover:bg-[#16241b] hover:text-white"
            >
              <FaInstagram className="text-sm" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-[#16241b] transition hover:bg-[#16241b] hover:text-white"
            >
              <FaLinkedinIn className="text-sm" />
            </a>
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.heading}>
            <h6 className="font-serif text-sm font-semibold text-[#16241b]">
              {col.heading}
            </h6>
            <ul className="mt-4 space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 transition hover:text-[#16241b]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-6 flex max-w-6xl flex-col-reverse items-start justify-between gap-3 text-xs text-gray-500 md:flex-row md:items-center">
        <span>© {currentYear} OMM AGRI VILLA LLP. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
