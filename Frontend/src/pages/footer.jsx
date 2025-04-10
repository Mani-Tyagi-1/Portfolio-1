import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Download,
  ArrowUp,
  Moon,
  Sun,
  MapPin,
  Coffee,
  ExternalLink,
} from "lucide-react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Track mouse position for gradient effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Track active section for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Particle animation for background
  const particles = Array.from({ length: 6 }, (_, i) => i);

  // Navigation items
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer
      className={`relative py-16 px-6 overflow-hidden ${
        isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-600"
      }`}
    >
      {/* Glowing effect based on mouse position */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 blur-2xl"
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 600,
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Top gradient line */}
        <motion.div
          className="h-2  w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-12"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.5 }}
          transition={{ duration: 1.2 }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col space-y-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`font-bold text-2xl ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Mani Tyagi
            </motion.div>
            <p className="text-sm max-w-xs">
              Creative developer and designer focused on building beautiful,
              functional user experiences.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin size={14} />
              <span>New Delhi, India</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Coffee size={14} />
              <span>Available for freelance</span>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col space-y-4"
          >
            <h3
              className={`font-semibold text-lg ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Quick Links
            </h3>
            <div className="flex flex-col space-y-2">
              {navItems.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  whileHover={{
                    x: 5,
                    color: isDarkMode ? "#ffffff" : "#3b82f6",
                  }}
                  className={`${
                    activeSection === item.name.toLowerCase()
                      ? isDarkMode
                        ? "text-blue-400"
                        : "text-blue-600"
                      : ""
                  } transition-colors inline-flex items-center`}
                >
                  <motion.span
                    className="w-0 h-px bg-blue-500 mr-2 inline-block"
                    animate={{
                      width:
                        activeSection === item.name.toLowerCase()
                          ? "1rem"
                          : "0rem",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col space-y-4"
          >
            <h3
              className={`font-semibold text-lg ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Contact
            </h3>
            <motion.a
              href="mailto:your.email@example.com"
              whileHover={{ x: 5, color: isDarkMode ? "#ffffff" : "#3b82f6" }}
              className="transition-colors flex items-center space-x-2"
            >
              <Mail size={14} />
              <span>manityagi1919@gmail.com</span>
            </motion.a>
            <p className="text-sm">
              Response time:{" "}
              <span
                className={isDarkMode ? "text-green-400" : "text-green-600"}
              >
                within 24 hours
              </span>
            </p>

            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-2 inline-flex items-center px-4 py-2 text-sm rounded-lg ${
                isDarkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
              } max-w-fit`}
            >
              <Download size={14} className="mr-2" />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Newsletter / Theme toggle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col space-y-4"
          >
            <h3
              className={`font-semibold text-lg ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Stay Updated
            </h3>
            <p className="text-sm">
              Subscribe to my newsletter for updates on new projects and
              articles.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className={`px-3 py-2 text-sm rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300"
                } border flex-grow`}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 text-sm ${
                  isDarkMode ? "bg-blue-600" : "bg-blue-500"
                } text-white rounded-r-lg font-medium`}
              >
                Subscribe
              </motion.button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-sm">Current time:</span>
              <span
                className={`text-sm font-mono ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`mt-2 self-end inline-flex items-center justify-center w-8 h-8 rounded-full ${
                isDarkMode ? "bg-gray-800" : "bg-gray-200"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDarkMode ? "moon" : "sun"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Middle section with social links */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Social media links with enhanced hover effects */}
          <motion.a
            href="https://github.com/Mani-Tyagi-1"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.1 }}
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors`}
          >
            <Github
              size={18}
              className={isDarkMode ? "text-white" : "text-gray-800"}
            />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/mani-tyagi-958415232z/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.1 }}
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors`}
          >
            <Linkedin
              size={18}
              className={isDarkMode ? "text-white" : "text-gray-800"}
            />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/mani-tyagi-958415232z/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.1 }}
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors`}
          >
            <Twitter
              size={18}
              className={isDarkMode ? "text-white" : "text-gray-800"}
            />
          </motion.a>

          <motion.a
            href="mailto:manityagi1919@gmail.com"
            whileHover={{ y: -5, scale: 1.1 }}
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors`}
          >
            <Mail
              size={18}
              className={isDarkMode ? "text-white" : "text-gray-800"}
            />
          </motion.a>
        </motion.div>

        {/* Bottom section with copyright */}
        <div className="flex flex-col gap-2 md:flex-row md:justify-between items-center text-sm">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mb-2 md:mb-0"
          >
            &copy; {new Date().getFullYear()} Mani Tyagi. All rights reserved.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className={`font-medium ${
              isDarkMode ? "text-gray-400" : "text-gray-800"
            }`}
          >
            Made with <span className="text-red-500">❤</span> by Mani
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex space-x-6"
          >
            <motion.a
              href="#"
              whileHover={{ color: isDarkMode ? "#ffffff" : "#3b82f6" }}
              className="transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ color: isDarkMode ? "#ffffff" : "#3b82f6" }}
              className="transition-colors"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ color: isDarkMode ? "#ffffff" : "#3b82f6" }}
              className="transition-colors"
            >
              Cookie Policy
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll to top button */}
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{
            y: -5,
            boxShadow: isDarkMode
              ? "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
              : "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
          }}
          className={`fixed z-50 bottom-6 right-6 w-12 h-12 rounded-full ${
            isDarkMode ? "bg-blue-600" : "bg-blue-500"
          } text-white flex items-center justify-center shadow-lg`}
        >
          <ArrowUp size={20} />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
