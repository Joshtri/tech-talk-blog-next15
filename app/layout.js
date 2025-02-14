import "./globals.css"; // Import Tailwind
import NavbarComp from "@/components/Partials/Navbar";
import Footer from "@/components/Partials/Footer";

// export const metadata = {
//   title: "Tech Talks Blog",
//   description: "Explore tech insights and trends.",

// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
<<<<<<< HEAD
        {/* <link rel="icon" href="/public/assets/tech_talk_lkkogo.png" /> */}
        <meta name="google-site-verification" content="wwXsr5Sc70Jz2F_MscQHBPTAXLadsUvMZXQBHYGhi9M" />
=======
        {/* Bisa tambahkan favicon di sini jika ingin */}
        {/* <link rel="icon" href="/public/assets/tech_talk_logo.png" /> */}
>>>>>>> 28ecc71c3a161bb5b40f360a590a25ebb5f2422e
      </head>
      <body className="bg-gray-50 dark:bg-gray-900">
        <NavbarComp />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
