// app/post/[slug]/PostContentClient.jsx
"use client";

import PostContent from "./PostContent";

export default function PostContentClient({ post }) {
  return <PostContent post={post} />;
}
