import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

import logo from "../../assets/images/logonew.png";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#062b1c] h-17 z-50">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
          <span className="text-white text-3xl font-bold tracking-wide">
            OMM AGRI
          </span>
        </Link>

        {/* Mobile Menu */}
        <button className="md:hidden text-white" onClick={() => setMenu(!menu)}>
          {menu ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white transition ${
                isActive
                  ? "text-[#f4a548] border-b-2 border-[#f4a548] pb-1"
                  : "hover:text-[#f4a548]"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? "text-[#f4a548] border-b-2 border-[#f4a548] pb-1"
                  : "text-white hover:text-[#f4a548]"
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/our-fruits"
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? "text-[#f4a548] border-b-2 border-[#f4a548] pb-1"
                  : "text-white hover:text-[#f4a548]"
              }`
            }
          >
            Our Fruits
          </NavLink>

          {/* <NavLink
            to="/our-network"
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? "text-[#f4a548] border-b-2 border-[#f4a548] pb-1"
                  : "text-white hover:text-[#f4a548]"
              }`
            }
          >
            Our Network
          </NavLink> */}
        </div>

        {/* CTA */}
        <Link
          to="/partner-with-us"
          className="hidden md:flex bg-[#f4a548] text-[#062b1c] font-semibold px-7 py-3 rounded-lg hover:bg-[#ffb65d] transition"
        >
          PARTNER WITH US
        </Link>
      </div>

      {/* Mobile Menu */}
      {menu && (
        <div className="md:hidden bg-[#062b1c] flex flex-col text-white">
          <NavLink className="px-6 py-4 border-t border-green-900" to="/">
            Home
          </NavLink>
          <NavLink
            className="px-6 py-4 border-t border-green-900"
            to="/about-us"
          >
            About
          </NavLink>
          <NavLink
            className="px-6 py-4 border-t border-green-900"
            to="/our-fruits"
          >
            Our Fruits
          </NavLink>
          {/* <NavLink
            className="px-6 py-4 border-t border-green-900"
            to="/our-network"
          >
            Our Network
          </NavLink> */}
          <NavLink
            className="px-6 py-4 border-t border-green-900"
            to="/partner-with-us"
          >
            Partner with us
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
