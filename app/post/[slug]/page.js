import axios from "axios";
import PostContent from "./PostContent";

export async function generateMetadata({ params }) {
  const slug = params.slug;

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${slug}`);
    const post = response.data.data;

    return {
      title: `Tech Talks Blog - ${post.title}`,
      description: post.description,
      openGraph: {
        title: `Tech Talks Blog - ${post.title}`,
        description: post.description,
        url: `https://tech-talks-blog.com/post/${slug}`,
        images: [
          {
            url: post.coverImageUrl || "https://tech-talks-blog.com/assets/tech_talk_logo.png",
            alt: post.title,
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: `Tech Talks Blog - ${post.title}`,
        description: post.description,
        images: [post.coverImageUrl || "https://tech-talks-blog.com/assets/tech_talk_logo.png"],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Tech Talks Blog",
      description: "Artikel tidak ditemukan",
    };
  }
}

export default async function ReadPost({ params }) {
  const slug = params.slug;
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${slug}`);
  const post = response.data.data;

  return <PostContent post={post} />;
}
