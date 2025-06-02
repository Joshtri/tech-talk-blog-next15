"use client";

import { useState } from "react";
import Welcome from "@/components/Welcome";
import SearchBar from "@/components/SearchBar";
import EmptyArticleMessage from "@/components/EmptyArticleMessage";
import PostsCard from "@/components/Post/PostsCard";
import SocialBar from "@/components/SocialBar";
import SkeletonPostsCard from "@/components/Post/SkeletonPostsCard.jsx";

export default function MainContent({ posts = [], error = null }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);

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
    <main className="container mx-auto px-4 py-8">
      <SocialBar />
      <Welcome />
      <SearchBar onSearch={handleSearch} />
      <div className="mt-8">
        {error ? (
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
              <PostsCard key={post.id || post._id || post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
