"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import techTalkLogo from "@assets/tech_talk_logo.png";

function NavbarComp() {
  const [theme, setTheme] = useState("light"); // default aman

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setTheme(localTheme || (prefersDark ? "dark" : "light"));
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Start the continuous spin animation on mount
  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
        duration: 10,
      },
    });
  }, [controls]);

  // Sync theme with localStorage
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.style.backgroundColor = "#111827";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.backgroundColor = "";
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg"
          : "bg-white dark:bg-gray-800 shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center">
            <motion.div
              animate={controls}
              onHoverStart={() => controls.stop()}
              onHoverEnd={() =>
                controls.start({
                  rotate: 360,
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                    duration: 10,
                  },
                })
              }
            >
              <Image
                src={techTalkLogo || "/placeholder.svg"}
                alt="Tech Talk Logo"
                width={40}
                height={40}
                className="mr-3"
              />
            </motion.div>
            <span
              className={`text-xl font-bold transition-colors duration-300 ${
                scrolled
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-800 dark:text-gray-200"
              }`}
            >
              Tech Talks Blog
            </span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex space-x-8">
            {[
              { name: "Blog", href: "/" },
              { name: "About", href: "/about" },
              { name: "News", href: "/news" },
              { name: "Games", href: "/games" },
              { name: "CS Hub", href: "/cs-hub" },
              { name: "Tech Talk Video", href: "/tech-talk-video" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`hover:text-blue-600 dark:hover:text-blue-400 text-lg transition duration-300 ${
                  scrolled
                    ? "text-gray-800 dark:text-gray-200"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Toggle Theme Button */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className={`md:hidden focus:outline-none transition-colors duration-300 ${
                scrolled
                  ? "text-gray-800 dark:text-gray-200"
                  : "text-gray-700 dark:text-gray-300"
              }`}
              aria-label="Toggle menu"
            >
              ☰
            </button>

            <button
              onClick={toggleTheme}
              className={`focus:outline-none transition-colors duration-300 ${
                scrolled
                  ? "text-gray-800 dark:text-gray-200"
                  : "text-gray-700 dark:text-gray-300"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <FaSun className="h-6 w-6" />
              ) : (
                <FaMoon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden py-3 space-y-2 ${
              scrolled
                ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-md"
                : "bg-white dark:bg-gray-800"
            }`}
          >
            {[
              { name: "Blog", href: "/" },
              { name: "About", href: "/about" },
              { name: "News", href: "/news" },
              { name: "Games", href: "/games" },
              { name: "CS Hub", href: "/cs-hub" },
              { name: "Tech Talk Video", href: "/tech-talk-video" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 text-lg transition duration-300 ${
                  scrolled
                    ? "text-gray-800 dark:text-gray-200"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavbarComp;
