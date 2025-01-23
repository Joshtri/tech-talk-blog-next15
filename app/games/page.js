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
        <title>Games Tech Talks Blog - Explore Fun and Exciting Games</title>
        <meta
          name="description"
          content="Explore a variety of fun and exciting games, including Mbul Adventure and Trash Taker Turtle. Play now or download for a great gaming experience!"
        />
        <meta
          name="keywords"
          content="Games, Adventure Games, Fun Games, Mbul Adventure, Trash Taker Turtle, Gaming, Download Games"
        />

        <meta name="author" content="Tech Talks Blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Games Tech Talks Blog - Explore Fun and Exciting Games" />
        <meta
          property="og:description"
          content="Check out Mbul Adventure and Trash Taker Turtle, two fun and exciting games for all ages. Play online or download now!"
        />
        {/* <meta
          property="og:image"
          content="https://img.itch.zone/aW1nLzg4NDU2NDUuanBn/315x250%23c/ft3M1p.jpg"
        /> */}

        <meta property="og:image" content="https://tech-talks-blog.com/assets/tech_talk_logo.png" />

        <meta property="og:url" content="https://tech-talks-blog.com/games" />
        <meta name="twitter:card" content="summary_large_image" />
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
