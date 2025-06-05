"use client";

import { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes, FaKeyboard } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showShortcut, setShowShortcut] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    "React hooks",
    "Tailwind CSS",
    "Next.js 13",
    "TypeScript tutorial",
  ]);
  const inputRef = useRef(null);

  // Simulate search loading
  const lastSearchRef = useRef("");

  const handleSearch = (fromTyping = false) => {
    if (!searchTerm.trim()) return;
    if (searchTerm === lastSearchRef.current) return; // mencegah pencarian duplikat

    setIsLoading(true);
    lastSearchRef.current = searchTerm;

    if (!recentSearches.includes(searchTerm) && !fromTyping) {
      setRecentSearches((prev) => [searchTerm, ...prev.slice(0, 3)]);
    }

    setTimeout(() => {
      onSearch(searchTerm);
      setIsLoading(false);
    }, 500);
  };

  const handleClear = () => {
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const handleRecentSearch = (term) => {
    setSearchTerm(term);
    handleSearch();
  };

  useEffect(() => {
    if (!searchTerm.trim()) return;

    const delayDebounce = setTimeout(() => {
      handleSearch(true); // fromTyping
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // ⬇ Tambahkan ini
  useEffect(() => {
    if (searchTerm.trim() === "") {
      onSearch(""); // reset ke semua post
    }
  }, [searchTerm]);

  // Keyboard shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex justify-center my-8 px-4">
      <div className="w-full max-w-2xl">
        <div
          className={`relative flex items-center bg-white dark:bg-gray-800 rounded-2xl transition-all duration-300 ${
            isFocused
              ? "shadow-lg ring-2 ring-blue-400 dark:ring-blue-500"
              : "shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700"
          }`}
          onMouseEnter={() => setShowShortcut(true)}
          onMouseLeave={() => setShowShortcut(false)}
        >
          {/* Search Icon */}
          <div className="flex items-center pl-5">
            <motion.div
              animate={{ rotate: isLoading ? 360 : 0 }}
              transition={{
                duration: 1,
                repeat: isLoading ? Number.POSITIVE_INFINITY : 0,
                ease: "linear",
              }}
            >
              <FaSearch
                className={`text-xl transition-all duration-300 ${
                  isLoading
                    ? "text-blue-500 dark:text-blue-400"
                    : isFocused
                    ? "text-blue-500 dark:text-blue-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              />
            </motion.div>
          </div>

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            className="flex-grow bg-transparent border-none focus:ring-0 focus:outline-none px-4 py-4 text-lg text-gray-700 placeholder-gray-400 dark:text-gray-200 dark:placeholder-gray-500"
            placeholder="Cari artikel di blog..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          {/* Clear Button - Only show when there's text */}
          {searchTerm && (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-2 focus:outline-none"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}

          {/* Keyboard Shortcut Indicator */}
          <AnimatePresence>
            {showShortcut && !isFocused && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="hidden md:flex absolute right-32 items-center space-x-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs text-gray-500 dark:text-gray-400"
              >
                <FaKeyboard />
                <span>Ctrl + K</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Button */}
          <button
            className={`relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-r-2xl transition duration-300 font-medium text-sm sm:text-base ${
              isLoading ? "cursor-not-allowed" : ""
            }`}
            onClick={handleSearch}
            disabled={isLoading}
          >
            {/* Ripple effect on click */}
            <span className="absolute inset-0 overflow-hidden">
              <span className="absolute inset-0 rounded-full bg-white/20 scale-0 transform origin-center transition-transform duration-500 ease-out group-active:scale-100"></span>
            </span>

            {isLoading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Mencari...</span>
              </div>
            ) : (
              "Cari"
            )}
          </button>
        </div>

        {/* Recent Searches Dropdown */}
        <AnimatePresence>
          {isFocused && recentSearches.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 mt-2 w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Pencarian Terakhir
                </h3>
              </div>
              <ul className="max-h-60 overflow-auto">
                {recentSearches.map((term, index) => (
                  <li key={index}>
                    <button
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center text-gray-700 dark:text-gray-200"
                      onClick={() => handleRecentSearch(term)}
                    >
                      <FaSearch className="text-gray-400 dark:text-gray-500 mr-3" />
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                <button
                  className="w-full text-center text-sm text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500 py-1"
                  onClick={() => {
                    setRecentSearches([]);
                    setSearchTerm(""); // kosongkan input
                    onSearch(""); // trigger pencarian kosong → tampilkan semua post
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Hapus Riwayat Pencarian
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchBar;
