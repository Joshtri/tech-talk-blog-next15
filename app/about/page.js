"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "flowbite-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowLeft as ArrowLeft,
  FiGithub as Github,
  FiLinkedin as Linkedin,
  FiTwitter as Twitter,
  FiMail as Mail,
  FiCode as Code,
  FiBookOpen as BookOpen,
  FiLayers as Lightbulb,
} from "react-icons/fi";
import ParticleBackground from "@/components/animations/ParticleBackground";

export default function AboutPage() {
  const headerRef = useRef(null);
  const missionRef = useRef(null);
  const founderRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // ... (your existing GSAP animations remain unchanged)
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <ParticleBackground color="#6366f1" particleCount={50} speed={15} />

      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative z-10 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Beranda
          </Link>

          {/* Header */}
          <div
            ref={headerRef}
            className="text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 p-12 rounded-2xl text-white shadow-xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tentang Tech Talks Blog
            </h1>
            <p className="text-xl text-indigo-100 dark:text-indigo-200 max-w-3xl mx-auto">
              Berbagi pengetahuan dan menginspirasi generasi teknologi
              berikutnya.
            </p>
          </div>

          {/* Misi & Visi */}
          <div
            ref={missionRef}
            className="mb-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-6">
              Misi & Visi
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Tech Talks Blog didirikan dengan misi untuk{" "}
                <strong>demokratisasi pengetahuan teknologi</strong>, khususnya
                di wilayah NTT dan sekitarnya.
              </p>
              <p>
                Melalui konten yang mudah dipahami dan relevan, blog ini
                berupaya membangun ekosistem teknologi yang inklusif di
                Indonesia Timur.
              </p>
              <p>
                Visi saya adalah masa depan di mana semua orang punya akses
                setara terhadap edukasi digital dan dapat berkontribusi dalam
                revolusi teknologi global.
              </p>
            </div>
          </div>

          {/* Tentang Pendiri */}
          <div
            ref={founderRef}
            className="mb-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg"
          >
            <div className="md:flex">
              <div className="md:w-2/5 relative">
                <div className="founder-photo h-full min-h-[300px] relative">
                  <Image
                    src="/placeholder.svg"
                    alt="Joshtri Lenggu"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-3/5 p-8">
                <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">
                  Tentang Penulis
                </h2>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Joshtri Lenggu
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Saya seorang full-stack developer dengan latar belakang
                  pengembangan web dan edukasi. Tech Talks Blog saya dirikan
                  sebagai media edukasi gratis bagi masyarakat NTT dan
                  sekitarnya.
                </p>
                <div className="flex space-x-4">
                  <a href="https://github.com/yosrylenggu" target="_blank">
                    <Github className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 h-6 w-6" />
                  </a>
                  <a href="https://linkedin.com/in/yosrylenggu" target="_blank">
                    <Linkedin className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 h-6 w-6" />
                  </a>
                  <a href="https://twitter.com/yosrylenggu" target="_blank">
                    <Twitter className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div
            ref={skillsRef}
            className="mb-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-8 text-center">
              Keahlian & Teknologi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-gray-600 dark:text-gray-300">
              {[
                {
                  title: "Web Development",
                  icon: <Code className="h-8 w-8" />,
                  desc: "React, Next.js, TypeScript, Node.js, dan berbagai stack modern.",
                },
                {
                  title: "Edukasi Teknologi",
                  icon: <BookOpen className="h-8 w-8" />,
                  desc: "Konten edukatif, tutorial, dan artikel IT berkualitas.",
                },
                {
                  title: "Inovasi Digital",
                  icon: <Lightbulb className="h-8 w-8" />,
                  desc: "Solusi teknologi untuk kebutuhan lokal & inovasi daerah.",
                },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="skill-icon p-4 rounded-full inline-flex items-center justify-center mb-4 bg-gray-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">
                    {item.title}
                  </h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div
            ref={contactRef}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-xl p-8 text-white text-center shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Hubungi Saya</h2>
            <p className="mb-6">
              Ingin berdiskusi atau berkolaborasi? Hubungi saya langsung lewat
              platform berikut.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {/* Tombol Email (masih bisa pakai Button langsung karena tidak link) */}
              <Button className="flex items-center space-x-2 bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 text-white">
                <Mail className="h-4 w-4" />
                <span>Email Saya</span>
              </Button>

              {/* Tombol GitHub */}
              <Link
                href="https://github.com/Joshtri"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="flex items-center space-x-2 bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 text-white">
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </Button>
              </Link>

              {/* Tombol LinkedIn */}
              <Link
                href="https://www.linkedin.com/in/arpakhsad-joshtri-sugiatma-lenggu-771242201/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="flex items-center space-x-2 bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 text-white">
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
