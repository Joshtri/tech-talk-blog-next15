import "./globals.css"; // Import Tailwind
import NavbarComp from "@/components/Partials/Navbar";
import Footer from "@/components/Partials/Footer";

export const metadata = {
  title: "Tech Talks Blog",
  description: "Explore tech insights and trends.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="wwXsr5Sc70Jz2F_MscQHBPTAXLadsUvMZXQBHYGhi9M" />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900">
        <NavbarComp />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
