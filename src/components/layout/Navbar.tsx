import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

import logo from "../../assets/images/OAVLOGO.png";
import { scrollToSection } from "../../utils/scrollToSection";

const PRIMARY = "#193768";

type NavLink =
  | { id: string; label: string; type: "scroll" }
  | { id: string; label: string; type: "route"; path: string };

const navLinks: NavLink[] = [
  { id: "home", label: "Home", type: "scroll" },
  { id: "about-us", label: "About Us", type: "scroll" },
  { id: "our-products", label: "Our Products", type: "scroll" },
  { id: "hayat-kiwi", label: "Hayat Kiwi", type: "route", path: "/hayat-kiwi" },
];

const contactLink: NavLink = { id: "contact-us", label: "Contact Us", type: "scroll" };

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

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

  // Scroll-spy: highlight the nav link for the section currently in view
  // Only relevant on the homepage, since that's the only place these section IDs exist
  useEffect(() => {
    if (!isHome) return;

    const scrollLinks = [...navLinks.filter((l) => l.type === "scroll"), contactLink];
    const sections = scrollLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  // Handles clicks on scroll-type links. If we're already on "/", scroll directly.
  // If we're on another route (e.g. /hayat-kiwi), navigate home first and pass
  // the target section id via router state, so Home can scroll to it after mount.
  const handleScrollClick = (id: string) => {
    setMenu(false);
    if (isHome) {
      scrollToSection(id);
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  const renderDesktopLink = (link: NavLink) => {
    const isActive =
      link.type === "route" ? location.pathname === link.path : isHome && activeId === link.id;

    if (link.type === "route") {
      return (
        <Link key={link.id} to={link.path} className="relative group pb-1">
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
        </Link>
      );
    }

    return (
      <button
        key={link.id}
        onClick={() => handleScrollClick(link.id)}
        className="relative group pb-1"
      >
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
      </button>
    );
  };

  const renderMobileLink = (link: NavLink) => {
    const isActive =
      link.type === "route" ? location.pathname === link.path : isHome && activeId === link.id;

    if (link.type === "route") {
      return (
        <Link
          key={link.id}
          to={link.path}
          onClick={() => setMenu(false)}
          className={`text-left px-6 py-4 border-b border-gray-100 font-medium transition-colors ${
            isActive ? "" : "text-gray-800 hover:text-[#193768]"
          }`}
          style={{ color: isActive ? PRIMARY : undefined }}
        >
          {link.label}
        </Link>
      );
    }

    return (
      <button
        key={link.id}
        onClick={() => handleScrollClick(link.id)}
        className={`text-left px-6 py-4 border-b border-gray-100 font-medium transition-colors ${
          isActive ? "" : "text-gray-800 hover:text-[#193768]"
        }`}
        style={{ color: isActive ? PRIMARY : undefined }}
      >
        {link.label}
      </button>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm h-20 z-50">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 md:px-8">
        {/* Logo - left side */}
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={(e) => {
            e.preventDefault();
            handleScrollClick("home");
          }}
        >
          <img src={logo} alt="logo" className="w-42 h-42 object-contain" />
        </Link>

        {/* Right side: nav links + contact button (desktop) / burger (mobile) */}
        <div className="flex items-center gap-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(renderDesktopLink)}

            {/* Contact Us - highlighted button */}
            <button
              onClick={() => handleScrollClick(contactLink.id)}
              className="font-bold text-white px-6 py-2.5 rounded-full transition-all duration-200 hover:brightness-110 hover:shadow-md"
              style={{ backgroundColor: PRIMARY }}
            >
              {contactLink.label}
            </button>
          </div>

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
        onClick={() => setMenu(false)}
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
            onClick={(e) => {
              e.preventDefault();
              handleScrollClick("home");
            }}
          >
            <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
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
          {navLinks.map(renderMobileLink)}

          {/* Contact Us - highlighted in mobile menu too */}
          <button
            onClick={() => handleScrollClick(contactLink.id)}
            className="text-left px-6 py-4 font-bold text-white"
            style={{ backgroundColor: PRIMARY }}
          >
            {contactLink.label}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;