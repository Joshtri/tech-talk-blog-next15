import { FiShare2 } from "react-icons/fi";

const ShareButton = ({ post }) => {
  const currentUrl = `https://tech-talks-blog.com/post/${post.slug}`;

  const shareOptions = [
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        post.title
      )}&url=${encodeURIComponent(currentUrl)}`,
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
    },
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(
        `${post.title} - ${currentUrl}`
      )}`,
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        currentUrl
      )}`,
    },
  ];

  return (
    <div className="flex space-x-2 mt-4">
      {shareOptions.map((option) => (
        <a
          key={option.name}
          href={option.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-slate-500 dark:hover:bg-slate-600"
        >
          <FiShare2 className="inline-block mr-2" />
          {option.name}
        </a>
      ))}
    </div>
  );
};

export default ShareButton;
