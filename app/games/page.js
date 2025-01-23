"use client";

// import GameCard from "@components/games/GameCard";
// import GameCard from "@/components/Games/GameCard";
import GamesCard from "@/components/Games/GamesCard";
import Head from "next/head";

const gamesData = [
  {
    title: "Mbul Adventure",
    description: "Join Mbul on an epic adventure filled with challenges and fun!",
    imageUrl: "https://img.itch.zone/aW1nLzg4NDU2NDUuanBn/315x250%23c/ft3M1p.jpg",
    tags: ["Adventure", "Single Player", "All Ages"],
    playOn: "Play on web browser",
    buttonText: "Play Now",
    buttonLink: "https://chipset-unc.itch.io/mbuls-adventure",
  },
  {
    title: "Trash Taker Turtle",
    description: "Help the turtle clean up the trash in this fun top-down shooter!",
    imageUrl: "https://img.itch.zone/aW1nLzE2MzQ0NzgyLnBuZw==/347x500/24u2Fg.png",
    tags: ["Top Down Shooter", "Single Player", "All Ages"],
    playOn: "Play on desktop",
    buttonText: "Download Now",
    buttonLink: "https://samuel-jacob.itch.io/trash-taker-turtle",
  },
];

export default function GamesPage() {
  return (
    <>
      <Head>
        <title>Games Tech Talks Blog - Permainan Seru dan Menarik untuk Semua Usia</title>
        <meta
          name="description"
          content="Temukan berbagai permainan di Tech Talks Blog, termasuk Mbul Adventure dan Trash Taker Turtle. Permainan seru untuk semua usia, tersedia untuk dimainkan secara online atau diunduh!"
        />
        <meta
          name="keywords"
          content="Tech Talks Blog, Permainan, Mbul Adventure, Trash Taker Turtle, Permainan Seru, Permainan Petualangan, Blog Gaming"
        />
        <meta name="author" content="Tim Tech Talks Blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Metadata */}
        <meta property="og:title" content="Games di Tech Talks Blog - Permainan Seru dan Menarik untuk Semua Usia" />
        <meta
          property="og:description"
          content="Mainkan permainan seru dan menarik di Tech Talks Blog, termasuk Mbul Adventure dan Trash Taker Turtle. Coba sekarang!"
        />
        <meta
          property="og:image"
          content="https://tech-talks-blog.com/assets/tech_talk_logo.png"
        />
        <meta property="og:url" content="https://tech-talks-blog.com/games" />
        <meta property="og:site_name" content="Tech Talks Blog" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Games di Tech Talks Blog - Permainan Seru dan Menarik" />
        <meta
          name="twitter:description"
          content="Jelajahi permainan seperti Mbul Adventure dan Trash Taker Turtle di Tech Talks Blog. Seru untuk semua orang!"
        />
        <meta
          name="twitter:image"
          content="https://tech-talks-blog.com/assets/tech_talk_logo.png"
        />
      </Head>

      <div className="p-4 max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold dark:text-gray-300 mb-6 text-center">
          Explore Our Games
        </h1>
        {gamesData.map((game, index) => (
          <GamesCard key={index} game={game} />
        ))}
      </div>
    </>
  );
}
