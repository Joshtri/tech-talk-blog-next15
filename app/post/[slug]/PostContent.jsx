"use client";

import { useState, useEffect } from "react";
import { MdDateRange } from "react-icons/md";
import { FiCopy, FiHeart } from "react-icons/fi";
import { format } from "date-fns";
import { Flip, toast, ToastContainer } from "react-toastify";
import Comment from "@/components/ReadPost/Comment";
import CommentList from "@/components/ReadPost/CommentList";
import ShareButton from "@/components/ReadPost/ShareButton";
import Subscription from "@/components/Subscription";
import "react-toastify/dist/ReactToastify.css";
import "highlight.js/styles/monokai-sublime.css";
import axios from "axios";

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
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/like/${post._id}`);
      setLiked(response.data.liked);
      setLikeCount(response.data.likeCount);
    } catch (err) {
      console.error("Error fetching like status:", err);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/comment/${post._id}`);
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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-800 px-4 py-8">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
        {post.coverImageUrl && (
          <img
            src={post.coverImageUrl}
            alt="Post Cover"
            className="w-full h-64 object-cover rounded-lg"
          />
        )}
        <h1 className="text-3xl font-bold text-center capitalize dark:text-gray-200 mt-4">
          {post.title}
        </h1>
        <p className="text-center text-gray-600 mt-2 dark:text-gray-300">
          <MdDateRange className="inline-block mr-2" />
          {format(new Date(post.createdAt), "MMMM dd, yyyy")}
        </p>
        <div
          className="text-gray-800 dark:text-gray-300 prose text-justify w-full max-w-4xl prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="flex justify-between mt-4 space-x-2">
          <button
            className={`px-3 py-1 rounded-md flex items-center ${
              liked ? "bg-red-500 text-white" : "bg-gray-200 dark:bg-slate-500 hover:bg-gray-300"
            }`}
            onClick={handleLikeToggle}
          >
            <FiHeart className="mr-2" />
            {liked ? "Liked" : "Like"}
          </button>
          <button
            className="px-3 py-1 rounded-md dark:bg-slate-500 bg-gray-200 hover:bg-gray-300"
            onClick={handleCopyLink}
          >
            <FiCopy className="mr-2" />
            Copy Link
          </button>
        </div>
        <ShareButton post={post} />
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8 max-w-4xl w-full">
        <Comment postId={post._id} onAddComment={(newComment) => setComments((prev) => [...prev, newComment])} />
        <CommentList comments={comments} />
        <Subscription />
      </div>

      <ToastContainer />
    </div>
  );
}
