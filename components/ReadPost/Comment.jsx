"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FiSend, FiMessageCircle } from "react-icons/fi";
import { Button, Spinner } from "flowbite-react";

function Comment({ postId, onAddComment }) {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comment`,
        {
          comment_user: newComment,
          postId,
        }
      );

      onAddComment(response.data);
      toast.success("📝 Komentar berhasil terkirim");
      setNewComment("");
    } catch (error) {
      toast.error("❌ Gagal mengirim komentar");
    } finally {
      setLoading(false);
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
          rows={4}
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
      </div>
    </div>
  );
}

export default Comment;
