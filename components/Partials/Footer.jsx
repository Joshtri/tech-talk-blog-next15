"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillGithub,
  AiOutlineX,
  AiFillYoutube,
  AiFillHeart,
  AiFillMail,
} from "react-icons/ai"
import { FaCode, FaCoffee, FaLaptopCode, FaRss } from "react-icons/fa"
import CardDonation from "../CardDonation"

const techTalkLogo = "/assets/tech_talk_logo.png" // Pastikan file ada di folder public/assets/

function FooterComp() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const d = new Date()
  const year = d.getFullYear()

  const handleSubscribe = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setEmail("")
      setIsSubmitting(false)
      alert("Terima kasih telah berlangganan!")
    }, 1000)
  }

  return (
    <>
      <footer className="relative bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-12 pb-6 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-100 dark:bg-blue-900/20 opacity-30"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-100 dark:bg-purple-900/20 opacity-30"></div>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="flex flex-col items-center md:items-start">
              <Link href="/" className="flex items-center mb-4">
                <Image src={techTalkLogo || "/placeholder.svg"} alt="Tech Talk Logo" width={60} height={60} />
                <span className="ml-3 text-xl font-bold text-gray-800 dark:text-white">Tech Talks</span>
              </Link>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center md:text-left mb-4">
                Berbagi pemikiran dan edukasi seputar dunia IT dan programming untuk semua orang.
              </p>
              <div className="flex space-x-3 mt-2">
                <motion.a
                  whileHover={{ y: -3 }}
                  href="https://www.youtube.com/@yosryy_lenggu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <AiFillYoutube className="text-red-500 text-xl" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  href="https://www.instagram.com/yosryy_lenggu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <AiFillInstagram className="text-pink-500 text-xl" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  href="https://www.facebook.com/yosry.lenggu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <AiFillFacebook className="text-blue-600 text-xl" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  href="https://github.com/Joshtri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <AiFillGithub className="text-gray-800 dark:text-white text-xl" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  href="https://x.com/yosryy_lenggu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <AiOutlineX className="text-gray-800 dark:text-white text-xl" />
                </motion.a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <FaCode className="mr-2 text-blue-500" /> Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setModalIsOpen(true)}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 flex items-center"
                  >
                    <FaCoffee className="mr-1" /> Buy me Coffee
                  </button>
                </li>
              </ul>
            </div>

            {/* Categories */}
            {/* <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <FaLaptopCode className="mr-2 text-blue-500" /> Categories
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/category/web-development"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/mobile-apps"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    Mobile Apps
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/programming"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    Programming
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/ai-ml"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    AI & Machine Learning
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/tech-news"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    Tech News
                  </Link>
                </li>
              </ul>
            </div> */}

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <FaRss className="mr-2 text-blue-500" /> Newsletter
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Dapatkan update artikel terbaru langsung ke email Anda.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-full px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg transition-colors duration-300 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                        <AiFillMail />
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Divider with gradient */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-6"></div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <div className="mb-4 md:mb-0">&copy; {year} Tech Talks. All rights reserved.</div>
            <div className="flex items-center">
              Made with <AiFillHeart className="text-red-500 mx-1" /> in Indonesia
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Donasi */}
      <CardDonation isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
    </>
  )
}

export default FooterComp
