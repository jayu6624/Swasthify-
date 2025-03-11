import logo from "../assets/images/logo.jpg";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Activity } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={logo}
              alt="Swasthify"
              className="w-10 h-10 rounded-full"
            />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-2xl font-bold ${
              isScrolled
                ? "text-white"
                : "bg-gradient-to-r from-primary to-green-500 bg-clip-text "
            }`}
          >
            Swasthify
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {["Home", "About-Us", "Contact"].map((item) => (
            <NavLink
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              label={item}
              isActive={
                location.pathname ===
                (item === "Home" ? "/" : `/${item.toLowerCase()}`)
              }
              isScrolled={isScrolled}
            />
          ))}
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${
                isScrolled ? "bg-white text-black" : "bg-black text-white"
              } px-8 py-2 rounded-full font-semibold text-base transition-all duration-300`}
            >
              Login/Sign-up
            </motion.button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className={`md:hidden ${isScrolled ? "text-white" : "text-black"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={`md:hidden ${
            isScrolled ? "bg-black" : "bg-white"
          } shadow-lg`}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {["Home", "About-Us", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={`py-2 border-b ${
                  isScrolled
                    ? "text-white border-gray-800"
                    : "text-gray-800 border-gray-100"
                }`}
              >
                {item}
              </Link>
            ))}
            <Link to={"/login"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${
                  isScrolled
                    ? "bg-white text-black"
                    : "bg-gradient-to-r from-primary bg-black text-white"
                } px-6 py-2 rounded-full font-medium mt-2 transition-all duration-300`}
              >
                Login/Sign-up
              </motion.button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

const NavLink = ({ to, label, isActive, isScrolled }) => {
  return (
    <Link to={to} className="relative group">
      <span
        className={`${
          isActive
            ? isScrolled
              ? "text-white font-semibold"
              : "text-primary font-semibold"
            : isScrolled
            ? "text-gray-300 font-semibold"
            : "text-gray-700 font-semibold"
        } transition-colors duration-300 tracking-wide text-base`}
      >
        {label}
      </span>
      <motion.span
        initial={{ width: isActive ? "100%" : "0%" }}
        animate={{ width: isActive ? "100%" : "0%" }}
        className={`absolute bottom-0 left-0 h-0.5 ${
          isScrolled ? "bg-white" : "bg-primary"
        } group-hover:w-full transition-all duration-300`}
      />
    </Link>
  );
};

export default Header;
