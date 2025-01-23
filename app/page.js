import axios from "axios";
import MainContent from "./MainContent";

export async function generateMetadata() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post`);
    const posts = response.data;

    return {
      title: "Tech Talks Blog - Temukan Wawasan dan Inspirasi Dunia Teknologi",
      description: "Jelajahi artikel terbaru dan wawasan mendalam tentang teknologi dan dunia IT di Tech Talks Blog.",
      openGraph: {
        title: "Tech Talks Blog - Temukan Wawasan dan Inspirasi Dunia Teknologi",
        description: "Jelajahi artikel terbaru dan wawasan mendalam tentang teknologi dan dunia IT di Tech Talks Blog.",
        url: "https://tech-talks-blog.com",
        images: [
          {
            url: "https://tech-talks-blog.com/assets/tech_talk_logo.png",
            alt: "Tech Talks Blog Cover",
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Tech Talks Blog - Temukan Wawasan dan Inspirasi Dunia Teknologi",
        description: "Selamat datang di Tech Talks Blog! Baca artikel terbaru dan wawasan mendalam tentang teknologi dan dunia IT.",
        images: ["https://tech-talks-blog.com/assets/tech_talk_logo.png"],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Tech Talks Blog - Beranda",
      description: "Selamat datang di Tech Talks Blog! Temukan artikel terbaru seputar teknologi.",
    };
  }
}

export default async function HomePage() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post`);
    const posts = response.data;

    return <MainContent posts={posts} />;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return <MainContent error="Gagal memuat postingan. Coba lagi nanti." />;
  }
}
