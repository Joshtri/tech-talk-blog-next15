"use client"; // Required for client-side rendering in Next.js

import { motion } from "framer-motion";
import DeveloperCard from "@/components/DeveloperCard";
import ButtonLink from "@/components/ButtonLink";
import Head from "next/head";
export default function AboutPage() {
  const cardVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const textVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, delay: 0.4 } },
  };

  return (
    <>
      <Head>
        <title>About Tech Talks Blog - Platform Edukasi IT dan Programming</title>
        <meta name="description" content="Pelajari lebih lanjut tentang Tech Talks Blog, platform yang berbagi pemikiran dan mengedukasi semua orang seputar dunia IT dan programming." />
        <meta name="keywords" content="Tech Talks Blog, Edukasi IT, Programming, Coding, Teknologi" />
        <meta name="author" content="Tech Talks Blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="About Tech Talks Blog - Platform Edukasi IT dan Programming" />
        <meta property="og:description" content="Pelajari lebih lanjut tentang Tech Talks Blog, platform yang berbagi pemikiran dan mengedukasi semua orang seputar dunia IT dan programming." />
        <meta property="og:image" content="https://tech-talks-blog.com/assets/tech_talk_logo.png" />
        <meta property="og:url" content="https://tech-talks-blog.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <motion.div
          className="max-w-3xl w-full px-6 mt-10 mb-10"
          variants={cardVariant}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <motion.h2
              className="text-2xl font-bold mb-4 dark:text-gray-200"
              variants={textVariant}
            >
              About Tech Talk
            </motion.h2>
            <motion.p
              className="text-gray-700 mb-4 dark:text-gray-200"
              variants={textVariant}
            >
              Selamat datang di Blog Tech Talk, pada blog ini saya ingin
              membagikan ilmu seputaran IT dalam berbagai bidang dan berinisiatif
              untuk mengedukasi semua orang bagi yang memang tertarik atau ingin
              mencari tahu mengenai IT.
            </motion.p>
            <motion.p
              className="text-gray-700 mb-8 dark:text-gray-200"
              variants={textVariant}
            >
              Misi dari blog ini adalah ingin mengedukasi semua orang mengenai IT,
              khusus di wilayah NTT.
            </motion.p>

            {/* Developer Card Component */}
            <DeveloperCard />

            {/* Back to Home Button */}
            <div className="flex justify-center mt-8">
              <ButtonLink href="/" label="Kembali ke Beranda" />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
