import type { Metadata } from "next";
import { Almarai } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/next-auth";

const almarai = Almarai({
  variable: "--font-almarai",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "منصة رواد",
  description: "منصة تعليمية لدورات البرمجة الحديثة",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="ar" dir="rtl">
      <body className={`${almarai.variable} antialiased bg-white text-black`}>
        <Provider>
          <Navbar session={session} />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
