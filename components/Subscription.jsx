"use client";

import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMail, FiPhone, FiBell, FiArrowRight } from "react-icons/fi";

function Subscription() {
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [whatsappFocused, setWhatsappFocused] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !whatsapp) {
      toast.warning("Please fill in all fields", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/subscription`,
        {
          email_subscription: email,
          whats_app_subscription: whatsapp,
        }
      );

      // Reset input fields after success
      setEmail("");
      setWhatsapp("");

      // Show success notification
      toast.success("Subscription successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      // Show error notification
      toast.error("Subscription failed. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg transform transition-all hover:shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-90 h-3"></div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <FiBell className="h-6 w-6 text-blue-500 dark:text-blue-300" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800 dark:text-gray-100">
          Stay Updated!
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Mau dapat email setiap ada postingan baru?
        </p>

        <div className="space-y-4">
          <div className="relative">
            <div
              className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${
                emailFocused ? "text-blue-500" : "text-gray-400"
              }`}
            >
              <FiMail className="h-5 w-5" />
            </div>
            <input
              required
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition-all duration-200 focus:outline-none"
            />
          </div>

          <div className="relative">
            <div
              className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${
                whatsappFocused ? "text-blue-500" : "text-gray-400"
              }`}
            >
              <FiPhone className="h-5 w-5" />
            </div>
            <input
              required
              type="number"
              placeholder="Enter your WhatsApp number..."
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              onFocus={() => setWhatsappFocused(true)}
              onBlur={() => setWhatsappFocused(false)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition-all duration-200 focus:outline-none"
            />
          </div>

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
            ) : (
              <>
                Subscribe <FiArrowRight className="ml-2" />
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default Subscription;
