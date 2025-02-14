import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
            <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-xl text-center">
                <h1 className="text-9xl font-extrabold text-gray-300 dark:text-gray-600 mb-4 animate-pulse">
                    404
                </h1>
                <h2 className="text-4xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
                    Oops! Page Not Found
                </h2>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
                    It seems the page you were looking for doesn't exist.
                </p>
                <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}