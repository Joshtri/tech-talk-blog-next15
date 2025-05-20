"use client";

import {
  FaShareAlt,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaCopy,
} from "react-icons/fa";
import { Dropdown } from "flowbite-react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function ShareDropdown({ slug, customUrl }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const finalUrl = customUrl || `${window.location.origin}/post/${slug}`;
    setUrl(finalUrl);
  }, [customUrl, slug]);

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      toast.success("🔗 Tautan berhasil disalin!");
    });
  };

  if (!url) return null; // ⏳ Tunggu sampai `window` tersedia

  return (
    <div className="relative">
      <Dropdown
        label={
          <div className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <FaShareAlt className="text-gray-600 dark:text-gray-400" />
          </div>
        }
        inline
        arrowIcon={false}
        className="!bg-white dark:!bg-gray-800 !border !border-gray-200 dark:!border-gray-700 !shadow-lg !rounded-lg"
      >
        <div className="min-w-[280px]">
          <Dropdown.Item
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                "_blank"
              )
            }
            className="flex items-center hover:!bg-gray-100 dark:hover:!bg-gray-700"
          >
            <FaFacebook className="mr-2 text-blue-600" />
            Bagikan ke Facebook
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?url=${url}`,
                "_blank"
              )
            }
            className="flex items-center hover:!bg-gray-100 dark:hover:!bg-gray-700"
          >
            <FaTwitter className="mr-2 text-blue-400" />
            Bagikan ke Twitter
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => window.open(`https://wa.me/?text=${url}`, "_blank")}
            className="flex items-center hover:!bg-gray-100 dark:hover:!bg-gray-700"
          >
            <FaWhatsapp className="mr-2 text-green-500" />
            Bagikan ke WhatsApp
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleCopyLink(url)}
            className="flex items-center hover:!bg-gray-100 dark:hover:!bg-gray-700"
          >
            <FaCopy className="mr-2 text-gray-500" />
            Salin Tautan
          </Dropdown.Item>
        </div>
      </Dropdown>
    </div>
  );
}
