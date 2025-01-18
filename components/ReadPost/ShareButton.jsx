import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiShare2, FiFacebook, FiTwitter } from "react-icons/fi";

const ShareButton = ({ post }) => {
  const [showOptions, setShowOptions] = useState(false);

  if (!post) return null;

  const currentUrl = `https://tech-talks-blog.com/post/${post.slug}`;

  const toggleShareOptions = () => setShowOptions(!showOptions);

  const handleShare = (platform) => {
    const title = post.title;
    const description = post.summary || "Check out this amazing post!";
    const image = post.coverImageUrl;

    const shareUrls = {
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${title}\n\n${description}\n${currentUrl}`
      )}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${title}\n${currentUrl}`
      )}&url=${encodeURIComponent(currentUrl)}`,
    };

    if (shareUrls[platform]) window.open(shareUrls[platform], "_blank");
  };

  return (
    <div className="relative">
      <button
        onClick={toggleShareOptions}
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        <FiShare2 className="inline-block mr-2" />
        Share
      </button>
      {showOptions && (
        <div className="absolute z-10 bg-white shadow-md rounded-md mt-2 w-40">
          <ul>
            <li
              onClick={() => handleShare("whatsapp")}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              <FaWhatsapp className="inline-block mr-2 text-green-500" />
              WhatsApp
            </li>
            <li
              onClick={() => handleShare("facebook")}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              <FiFacebook className="inline-block mr-2 text-blue-600" />
              Facebook
            </li>
            <li
              onClick={() => handleShare("twitter")}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              <FiTwitter className="inline-block mr-2 text-blue-400" />
              Twitter
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
