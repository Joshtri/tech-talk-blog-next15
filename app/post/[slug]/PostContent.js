"use client";

import Comment from "@/components/ReadPost/Comment";
import CommentList from "@/components/ReadPost/CommentList";
import Subscription from "@/components/Subscription";
import axios from "axios";
import "highlight.js/styles/monokai-sublime.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiCopy, FiHeart } from "react-icons/fi";
import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PostContent({ post }) {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchLikeStatus();
    fetchComments();
  }, [post]);

  const fetchLikeStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/like/${post._id}`
      );
      setLiked(response.data.liked);
      setLikeCount(response.data.likeCount);
    } catch (err) {
      console.error("Error fetching like status:", err);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comment/${post._id}`
      );
      setComments(response.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleLikeToggle = async () => {
    try {
      const url = liked
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/unlike`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/like`;

      const response = await axios.post(url, { postId: post._id });
      setLikeCount(response.data.likeCount);
      setLiked(!liked);
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("🦄 Link copied to clipboard!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          pauseOnHover: true,
          theme: "light",
          transition: Flip,
        });
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-800 px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-lg shadow-md">
        {post.coverImageUrl && (
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-4">
            <Image
              src={post.coverImageUrl || "/placeholder.svg"}
              alt="Post Cover"
              fill
              loading="lazy"
              className="object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
        )}

        <h1 className="text-2xl sm:text-3xl font-bold text-center capitalize dark:text-gray-200 mt-4">
          {post.title}
        </h1>

        <div
          className="text-gray-800 dark:text-gray-300 prose text-justify w-full max-w-4xl prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="flex flex-wrap justify-between mt-6 gap-2">
          <button
            className={`px-3 py-1.5 rounded-md flex items-center transition-colors ${
              liked
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-700 dark:text-white"
            }`}
            onClick={handleLikeToggle}
          >
            <FiHeart className={`mr-2 ${liked ? "fill-current" : ""}`} />
            <span>{liked ? "Liked" : "Like"}</span>
            {likeCount > 0 && <span className="ml-1">({likeCount})</span>}
          </button>

          <button
            className="px-3 py-1.5 rounded-md dark:bg-slate-600 bg-gray-200 hover:bg-gray-300 dark:hover:bg-slate-700 flex items-center dark:text-white transition-colors"
            onClick={handleCopyLink}
          >
            <FiCopy className="mr-2" />
            <span className="hidden sm:inline">Copy Link</span>
            <span className="sm:hidden">Copy</span>
          </button>
        </div>
      </div>

      <div className="space-y-6 mt-8 max-w-4xl w-full">
        <Comment
          postId={post._id}
          onAddComment={(newComment) =>
            setComments((prev) => [...prev, newComment])
          }
        />
        <CommentList comments={comments} />
        <div className="mt-8">
          <Subscription />
        </div>
      </div>
    </div>
  );
}
