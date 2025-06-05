"use client";

import Comment from "@/components/ReadPost/Comment";
import CommentList from "@/components/ReadPost/CommentList";
import Subscription from "@/components/Subscription";
import { copyCurrentUrlToClipboard } from "@/utils/common";
import axios from "axios";
import "highlight.js/styles/monokai-sublime.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiCopy, FiHeart } from "react-icons/fi";

export default function PostContent({ post }) {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (post?._id) {
      fetchLikeStatus();
      fetchComments();
    }
  }, [post?._id]);

  const fetchLikeStatus = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/like/${post._id}`
      );
      setLiked(res.data.liked);
      setLikeCount(res.data.likeCount);
    } catch (err) {
      console.error("Failed to fetch like status:", err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comment/${post._id}`
      );
      setComments(res.data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  const handleLikeToggle = async () => {
    try {
      const url = liked
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/unlike`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/like`;

      const res = await axios.post(url, { postId: post._id });
      setLiked(!liked);
      setLikeCount(res.data.likeCount);
    } catch (err) {
      console.error("Failed to update like status:", err);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-800 px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-lg shadow-md">
        {post.coverImageUrl && (
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-4">
            <Image
              src={post.coverImageUrl}
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
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert text-justify text-gray-800 dark:text-gray-300 max-w-4xl w-full"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="flex flex-wrap justify-between mt-6 gap-2">
          <button
            onClick={handleLikeToggle}
            className={`px-3 py-1.5 rounded-md flex items-center transition-colors ${
              liked
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-700 dark:text-white"
            }`}
          >
            <FiHeart className={`mr-2 ${liked ? "fill-current" : ""}`} />
            <span>{liked ? "Liked" : "Like"}</span>
            {likeCount > 0 && <span className="ml-1">({likeCount})</span>}
          </button>

          <button
            onClick={copyCurrentUrlToClipboard}
            className="px-3 py-1.5 rounded-md bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-700 flex items-center dark:text-white transition-colors"
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
