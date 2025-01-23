"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Welcome from "@/components/Welcome";
import SearchBar from "@/components/SearchBar";
import EmptyArticleMessage from "@/components/EmptyArticleMessage";
import PostsCard from "@/components/Post/PostsCard";
import SocialBar from "@/components/SocialBar";
import SkeletonPostsCard from "@/components/Post/SkeletonPostsCard.jsx"; // Komponen Skeleton

export default function MainPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post`);
      const postsWithComments = await Promise.all(
        response.data.map(async (post) => {
          try {
            const commentResponse = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/api/comment/count/${post._id}`
            );
            return { ...post, commentsCount: commentResponse.data.count || 0 };
          } catch {
            return { ...post, commentsCount: 0 };
          }
        })
      );
      setPosts(postsWithComments);
      setFilteredPosts(postsWithComments);
      setLoading(false);
    } catch (err) {
      setError("Gagal memuat postingan. Coba lagi nanti.");
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredPosts(posts);
    } else {
      const results = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(results);
    }
  };

  return (

    <>
          <Head>
        {/* Title */}
        <title>Tech Talks Blog - Temukan Wawasan dan Inspirasi Dunia Teknologi</title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Selamat datang di Tech Talks Blog! Jelajahi artikel dan wawasan terbaru tentang teknologi, IT, pengembangan perangkat lunak, dan masih banyak lagi."
        />

        {/* Meta Keywords */}
        <meta
          name="keywords"
          content="Tech Talks Blog, Blog Teknologi, Artikel IT, Wawasan Teknologi, Pengembangan Perangkat Lunak, Coding, Programming, Teknologi Terkini"
        />

        {/* Author */}
        <meta name="author" content="Tim Tech Talks Blog" />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph Metadata */}
        <meta property="og:title" content="Tech Talks Blog - Temukan Wawasan dan Inspirasi Dunia Teknologi" />
        <meta
          property="og:description"
          content="Jelajahi artikel dan wawasan terbaru tentang teknologi, IT, pengembangan perangkat lunak, dan masih banyak lagi di Tech Talks Blog."
        />
        <meta property="og:image" content="https://tech-talks-blog.com/assets/tech_talks_blog_cover.png" />
        <meta property="og:url" content="https://tech-talks-blog.com" />
        <meta property="og:site_name" content="Tech Talks Blog" />
        <meta property="og:type" content="website" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tech Talks Blog - Temukan Wawasan dan Inspirasi Dunia Teknologi" />
        <meta
          name="twitter:description"
          content="Selamat datang di Tech Talks Blog! Baca artikel terbaru dan wawasan mendalam tentang teknologi dan dunia IT."
        />
        <meta name="twitter:image" content="https://tech-talks-blog.com/assets/tech_talks_blog_cover.png" />

        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
    
    <main className="container mx-auto px-4 py-8">
      <SocialBar />
      <Welcome />
      <SearchBar onSearch={handleSearch} />
      <div className="mt-8">
        {loading ? (
          // Skeleton Loading
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 16 }).map((_, index) => (
              <SkeletonPostsCard key={index} />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredPosts.length === 0 ? (
          <EmptyArticleMessage
            message="Postingan Tidak Ditemukan"
            description="Kami tidak dapat menemukan postingan dengan kata kunci pencarian Anda. Gunakan kata kunci lain!"
            buttonText="Tampilkan Semua Postingan"
            onButtonClick={() => setFilteredPosts(posts)}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostsCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
    </>
  );
}
