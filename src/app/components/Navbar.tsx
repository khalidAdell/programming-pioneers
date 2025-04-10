"use client";
import { useState } from "react";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

interface NavbarProps {
  session: Session | null;
}

const Navbar = ({ session }: NavbarProps) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Get session from next-auth
  const isAuthenticated = !!session;

  const isCoursesActive = pathname?.startsWith("/courses");
  const isActive = (path: string) => decodeURIComponent(pathname) === path;

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center order-2 md:order-1 h-16 overflow-hidden">
            <Link href="/" className="block relative h-28 w-28 md:h-35 md:w-35">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-grow justify-center order-2">
            <div className="flex items-center space-x-4 lg:space-x-6 space-x-reverse">
              <Link
                href="/"
                className={`px-2 lg:px-3 py-2 text-sm lg:text-base ${
                  isActive("/")
                    ? "text-yellow-500 font-bold"
                    : "text-gray-800 hover:text-yellow-500"
                }`}
              >
                الرئيسية
              </Link>

              <div className="relative group">
                <button
                  className={`px-2 lg:px-3 py-2 flex items-center text-sm lg:text-base ${
                    isCoursesActive
                      ? "text-yellow-500 font-bold"
                      : "text-gray-800 hover:text-yellow-500"
                  }`}
                >
                  الدورات
                  <ChevronDown
                    size={16}
                    className={`mr-1 transition-transform ${
                      isCoursesActive ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-right">
                  {[
                    { path: "/courses/تطوير الويب", label: "تطوير الويب" },
                    {
                      path: "/courses/تطبيقات الجوال",
                      label: "تطبيقات الجوال",
                    },
                    {
                      path: "/courses/الذكاء الاصطناعي",
                      label: "الذكاء الاصطناعي",
                    },
                    { path: "/courses", label: "جميع الدورات" },
                  ].map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`block px-4 py-2 text-sm ${
                        isActive(link.path)
                          ? "bg-yellow-100 text-yellow-600"
                          : "text-gray-800 hover:bg-yellow-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {[
                { path: "/instructors", label: "المدربون" },
                { path: "/blog", label: "المدونة" },
                { path: "/about", label: "عن المنصة", mobileHidden: true },
                { path: "/contact", label: "اتصل بنا", mobileHidden: true },
              ].map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-2 lg:px-3 py-2 text-sm lg:text-base ${
                    isActive(link.path)
                      ? "text-yellow-500 font-bold"
                      : "text-gray-800 hover:text-yellow-500"
                  } ${link.mobileHidden ? "hidden lg:block" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden order-1 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* User actions */}
          <div className="flex items-center order-3">
            {isAuthenticated ? (
              <div className="relative mr-2 md:mr-4">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center focus:outline-none"
                  aria-label="Open user menu"
                >
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-gray-800 font-semibold">
                    {session?.user?.image ? (
                      <Image
                        src={session?.user?.image}
                        fill
                        alt={session?.user?.name || "صورة المستخدم"}
                        className="object-cover max-w-8 h-8 rounded-full"
                      />
                    ) : session?.user?.name ? (
                      session?.user.name.charAt(0).toUpperCase()
                    ) : (
                      "U"
                    )}
                  </div>
                  <span className="hidden md:block text-gray-800 ml-2 mr-1">
                    {session?.user?.name || "المستخدم"}
                  </span>
                  <ChevronDown size={16} className="text-gray-600" />
                </button>

                {/* User dropdown menu */}
                {isUserMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 text-right">
                    <Link
                      href="/profile"
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 flex items-center"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User size={16} className="ml-2" />
                      <span>الملف الشخصي</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 flex items-center"
                    >
                      <LogOut size={16} className="ml-2" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="mr-2 md:mr-4 flex">
                <Link
                  href="/login"
                  className="text-gray-800 hover:text-yellow-500 font-semibold px-2 md:px-3 py-2 text-sm hidden sm:block"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/register"
                  className="block bg-yellow-500 text-gray-800 font-semibold px-3 md:px-4 py-2 sm:py-2.5 rounded-lg hover:bg-yellow-400 transition-colors mr-1 md:mr-2 text-sm"
                >
                  إنشاء حساب
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 text-right">
          {[
            { path: "/", label: "الرئيسية" },
            { path: "/instructors", label: "المدربون" },
            { path: "/blog", label: "المدونة" },
            { path: "/about", label: "عن المنصة" },
            { path: "/contact", label: "اتصل بنا" },
          ].map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`block px-3 py-2 rounded-md ${
                isActive(link.path)
                  ? "bg-yellow-100 text-yellow-600"
                  : "text-gray-800 hover:bg-yellow-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile courses dropdown */}
          <div>
            <button
              className={`flex w-full justify-between items-center px-3 py-2 rounded-md ${
                isCoursesActive
                  ? "bg-yellow-100 text-yellow-600"
                  : "text-gray-800 hover:bg-yellow-50"
              }`}
              onClick={() => setIsCoursesDropdownOpen(!isCoursesDropdownOpen)}
            >
              <span>الدورات</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  isCoursesDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`pr-4 transition-all duration-300 overflow-hidden ${
                isCoursesDropdownOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              {[
                { path: "/courses/web", label: "تطوير الويب" },
                { path: "/courses/mobile", label: "تطبيقات الجوال" },
                { path: "/courses/ai", label: "الذكاء الاصطناعي" },
                { path: "/courses/all", label: "جميع الدورات" },
              ].map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`block px-3 py-2 rounded-md ${
                    isActive(link.path)
                      ? "bg-yellow-100 text-yellow-600"
                      : "text-gray-800 hover:bg-yellow-50"
                  }`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsCoursesDropdownOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {!isAuthenticated ? (
            <Link
              href="/login"
              className={`block px-3 py-2 rounded-md ${
                isActive("/login")
                  ? "bg-yellow-100 text-yellow-600"
                  : "text-gray-800 hover:bg-yellow-50"
              } sm:hidden`}
              onClick={() => setIsMenuOpen(false)}
            >
              تسجيل الدخول
            </Link>
          ) : (
            <>
              <Link
                href="/profile"
                className={`block px-3 py-2 rounded-md ${
                  isActive("/profile")
                    ? "bg-yellow-100 text-yellow-600"
                    : "text-gray-800 hover:bg-yellow-50"
                } flex items-center`}
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={16} className="ml-2" />
                <span>الملف الشخصي</span>
              </Link>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
                className="w-full text-right flex items-center px-3 py-2 rounded-md text-gray-800 hover:bg-yellow-50"
              >
                <LogOut size={16} className="ml-2" />
                <span>تسجيل الخروج</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
