import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";

import logo from "../../assets/images/logonew.png";

const PRIMARY = "#193768";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about-us", label: "About Us" },
  { to: "/our-fruits", label: "Our Products" },
  { to: "/our-leadership", label: "Our Leadership" },
  { to: "/our-network", label: "Our Network" },
  { to: "/blog", label: "Blogs" },
  { to: "/contact", label: "Contact Us" },
];

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menu &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menu]);

  // Lock scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm h-20 z-50">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setMenu(false)}
        >
          <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
          {/* <span
            className="text-2xl md:text-3xl font-bold tracking-wide"
          >
            OMM AGRI
          </span> */}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className="relative group pb-1">
              {({ isActive }) => (
                <>
                  <span
                    className={`font-bold transition-colors duration-200 group-hover:text-[#193768] ${
                      isActive ? "font-bold text-[#193768]" : "text-black"
                    }`}
                  >
                    {link.label}
                  </span>
                  <span
                    className={`absolute left-0 -bottom-5 h-1 w-full transition-transform duration-400 ease-out ${
                      isActive
                        ? "scale-x-100 origin-left"
                        : "scale-x-0 origin-right group-hover:origin-left group-hover:scale-x-100"
                    }`}
                    style={{ backgroundColor: PRIMARY }}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right side: search + CTA (desktop) / burger (mobile) */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border transition-colors"
            style={{ borderColor: "#e5e7eb", color: PRIMARY }}
          >
            <Search size={18} />
          </button>

          {/* Mobile burger */}
          <button
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            style={{ color: PRIMARY }}
            onClick={() => setMenu(true)}
            aria-label="Open menu"
          >
            <Menu
              size={28}
              className={`transition-all duration-300 ${menu ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 ${
          menu
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile sidebar panel */}
      <div
        ref={sidebarRef}
        className={`md:hidden fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-50 shadow-xl transition-transform duration-300 ease-in-out ${
          menu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setMenu(false)}
          >
            <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
            {/* <span className="font-bold text-lg" style={{ color: PRIMARY }}>
              OMM AGRI
            </span> */}
          </Link>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-md text-white transition-transform duration-300"
            style={{
              backgroundColor: PRIMARY,
              transform: menu ? "rotate(0deg)" : "rotate(-90deg)",
            }}
            onClick={() => setMenu(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-col">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenu(false)}
              className={({ isActive }) =>
                `px-6 py-4 border-b border-gray-100 font-medium transition-colors ${
                  isActive ? "" : "text-gray-800 hover:text-[#193768]"
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? PRIMARY : undefined,
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;