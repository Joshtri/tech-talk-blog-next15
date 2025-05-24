"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaCommentDots,
  FaShareAlt,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaCopy,
  FaRegClock,
} from "react-icons/fa";
import { id } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import { Dropdown } from "flowbite-react";
import ShareDropdown from "../common/ShareDropdown";

function PostsCard({ post }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [randomCategory, setRandomCategory] = useState(null);

  useEffect(() => {
    const categories = ["Technology", "Programming", "Web Dev", "AI", "Mobile"];
    const picked = categories[Math.floor(Math.random() * categories.length)];
    setRandomCategory(picked);
  }, []);

  const handleButtonClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      alert("Tautan disalin ke clipboard!");
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden h-full flex flex-col border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
        {/* Category Badge */}
        <div className="absolute z-10 top-4 left-4">
          {randomCategory && (
            <span className="bg-blue-600/90 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
              {randomCategory}
            </span>
          )}
        </div>

        {/* Image Container */}
        <div className="relative overflow-hidden h-52">
          {post.coverImageUrl ? (
            <img
              src={post.coverImageUrl || "/placeholder.svg"}
              alt={post.title}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white text-xl font-bold">Tech Talks</span>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>

          {/* Time info on image */}
          <div className="absolute bottom-3 left-3 text-white text-xs flex items-center">
            <FaRegClock className="mr-1" />
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
              locale: id,
            })}
          </div>

          {/* Comments count on image */}
          <div className="absolute bottom-3 right-3 text-white text-xs flex items-center">
            <span>{post.commentsCount || post.commentCount ||  0}</span>
            <FaCommentDots className="ml-1" />
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-3">
            {post.description?.slice(0, 100)}...
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
            {/* Share Dropdown */}

            <ShareDropdown slug={post.slug} />

            {/* Read More Button */}
            <Link href={`/post/${post.slug}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 ${
                  isAnimating ? "animate-pulse" : ""
                }`}
                onClick={handleButtonClick}
              >
                Baca Selengkapnya
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PostsCard;
