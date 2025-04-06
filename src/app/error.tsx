"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full text-center border-t-4 border-red-500">
        <div className="flex justify-center mb-6">
          <AlertTriangle size={64} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">حدث خطأ ما</h1>
        <p className="text-gray-600 mb-8">
          نأسف للإزعاج، حدث خطأ أثناء محاولة معالجة طلبك.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-xl transition-colors"
          >
            <RefreshCw size={18} />
            <span>إعادة المحاولة</span>
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-3 px-6 rounded-xl transition-colors"
          >
            <Home size={18} />
            <span>العودة للرئيسية</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
