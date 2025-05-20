"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiSend, FiMessageCircle } from "react-icons/fi";
import { Button, Tooltip, Spinner } from "flowbite-react";

function Comment({ postId, onAddComment }) {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddComment = async () => {
    if (newComment.trim() === "") return; // Prevent empty comments

    try {
      setLoading(true);

      // Make the API request to add a comment
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/comment`,
        {
          comment_user: newComment,
          postId: postId,
        }
      );

      // Trigger parent function to update comments list
      onAddComment(response.data);

      // Show success toast once
      toast.success("Komentar berhasil terkirim", {
        toastId: "comment-success", // Unique ID to prevent duplicate toasts
      });

      // Reset comment input
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Gagal mengirim komentar");
    } finally {
      setLoading(false); // Ensure loading state is disabled
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 max-w-4xl mx-auto mt-5 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <FiMessageCircle className="text-blue-500 dark:text-blue-400 text-xl" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Beri Komentar
        </h2>
      </div>

      <div className="mb-4 relative">
        <textarea
          className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
          rows="4"
          placeholder="Type your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={loading}
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-500 dark:text-gray-400">
          {newComment.length > 0 ? `${newComment.length} karakter` : ""}
        </div>
      </div>

      <div className="flex justify-end">
        <Tooltip content="Kirim Komentar" placement="top" style="light">
          <Button
            color="blue"
            pill
            onClick={handleAddComment}
            disabled={loading || newComment.trim() === ""}
            className="px-5 py-2.5 transition-all duration-300 hover:shadow-md"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" light={true} />
                <span>Mengirim...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-900 dark:text-gray-50">
                <FiSend className="h-5 w-5" />
                <span>Kirim</span>
              </div>
            )}
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}

export default Comment;
