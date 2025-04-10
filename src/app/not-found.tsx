import Link from "next/link";
import { Search, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full text-center border-t-4 border-yellow-500">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Search size={80} className="text-gray-300" />
              <div className="absolute top-0 right-0 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                ?
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            الصفحة غير موجودة
          </h2>
          <p className="text-gray-600 mb-8">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها أو حذفها.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-xl transition-colors"
            >
              <Home size={18} />
              <span>العودة للرئيسية</span>
            </Link>
            <Link
              href="/courses"
              className="flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-3 px-6 rounded-xl transition-colors"
            >
              <span>تصفح الدورات</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
