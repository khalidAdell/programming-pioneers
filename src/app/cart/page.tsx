"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  CreditCard,
  ChevronLeft,
  Trash2,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";

const CartPage = () => {
  const router = useRouter();
  const [promoCode, setPromoCode] = useState<string>("");
  const [promoStatus, setPromoStatus] = useState<
    "idle" | "validating" | "success" | "error"
  >("idle");
  const [promoError, setPromoError] = useState<string>("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);

  // Sample cart items - in a real app these would come from API/context
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "دورة البرمجة التفاعلية الشاملة",
      instructor: "د. أحمد محمود",
      image: "/courses/course1.jpg",
      price: 199.99,
      originalPrice: 249.99,
    },
    {
      id: 2,
      title: "أساسيات تطوير تطبيقات الويب",
      instructor: "م. سارة الشافعي",
      image: "/courses/course2.jpg",
      price: 149.99,
      originalPrice: 149.99,
    },
  ]);

  const removeItem = (itemId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const tax = subtotal * 0.14; // 14% VAT for Egypt
  const total = subtotal + tax - discount;

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!promoCode.trim()) return;

    setPromoStatus("validating");

    // Simulate API call to validate promo code
    setTimeout(() => {
      // Sample validation logic - in real app would be API call
      if (promoCode.toUpperCase() === "EGYPT25") {
        const discountAmount = subtotal * 0.25; // 25% discount
        setDiscount(discountAmount);
        setPromoStatus("success");
        setAppliedPromo(promoCode);
      } else {
        setPromoStatus("error");
        setPromoError("الكود غير صالح أو منتهي الصلاحية");
      }
    }, 1000);
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setDiscount(0);
    setPromoCode("");
    setPromoStatus("idle");
  };

  const proceedToCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-right">
            سلة المشتريات
          </h1>
          <div className="flex items-center gap-2 mt-2 text-right justify-end">
            <Link
              href="/courses"
              className="text-gray-600 hover:text-yellow-600"
            >
              تصفح الدورات
            </Link>
            <ChevronLeft size={16} className="text-gray-400" />
            <span className="text-gray-800">السلة</span>
          </div>
        </div>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 text-right">
                  الدورات في السلة ({cartItems.length})
                </h2>

                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0"
                    >
                      <div className="relative w-full sm:w-32 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-grow text-right">
                        <h3 className="font-bold text-gray-800 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          بواسطة {item.instructor}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm"
                          >
                            <Trash2 size={16} />
                            إزالة
                          </button>

                          <div className="text-right">
                            {item.originalPrice > item.price && (
                              <span className="text-gray-500 line-through text-sm ml-2">
                                {item.originalPrice} دولار
                              </span>
                            )}
                            <span className="font-bold text-gray-900">
                              {item.price} دولار
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo Code */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 text-right">
                  كود الخصم
                </h2>

                {appliedPromo ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                    <button
                      onClick={removePromoCode}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={16} />
                    </button>
                    <div className="flex items-center gap-2 text-right">
                      <CheckCircle size={16} className="text-green-500" />
                      <div>
                        <p className="font-medium text-green-800">
                          تم تطبيق كود الخصم: {appliedPromo}
                        </p>
                        <p className="text-sm text-green-700">
                          وفرت {discount.toFixed(2)} دولار
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handlePromoSubmit} className="flex gap-2">
                    <button
                      type="submit"
                      disabled={promoStatus === "validating"}
                      className={`bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-lg flex-shrink-0 transition-colors ${
                        promoStatus === "validating"
                          ? "opacity-70 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      تطبيق
                    </button>

                    <div className="relative flex-grow">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value);
                          setPromoStatus("idle");
                        }}
                        placeholder="أدخل كود الخصم"
                        className={`w-full border rounded-lg py-2 px-4 text-right ${
                          promoStatus === "error"
                            ? "border-red-500 pr-10"
                            : "border-gray-300"
                        }`}
                      />
                      {promoStatus === "error" && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <AlertCircle size={16} className="text-red-500" />
                        </div>
                      )}
                    </div>
                  </form>
                )}

                {promoStatus === "error" && (
                  <p className="text-red-500 text-sm mt-2 text-right">
                    {promoError}
                  </p>
                )}

                <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                  <p className="text-blue-800 text-sm text-right">
                    <span className="font-bold">نصيحة:</span> جرب الكود
                    &quot;EGYPT25&quot; للحصول على خصم 25% على مشترياتك!
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-800 mb-6 text-right">
                  ملخص الطلب
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">المجموع الفرعي</span>
                    <span className="font-medium text-gray-900">
                      {subtotal.toFixed(2)} دولار
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">الضريبة (14%)</span>
                    <span className="font-medium text-gray-900">
                      {tax.toFixed(2)} دولار
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex items-center justify-between text-green-600">
                      <span>الخصم</span>
                      <span className="font-medium">
                        - {discount.toFixed(2)} دولار
                      </span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                    <span className="font-bold text-gray-900">المجموع</span>
                    <span className="font-bold text-yellow-600 text-xl">
                      {total.toFixed(2)} دولار
                    </span>
                  </div>
                </div>

                <button
                  onClick={proceedToCheckout}
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard size={18} />
                  المتابعة للدفع
                </button>

                <p className="mt-4 text-center text-sm text-gray-600">
                  بالضغط على &quot;المتابعة للدفع&quot;، أنت توافق على
                  <Link
                    href="/terms"
                    className="text-yellow-600 hover:text-yellow-700 mx-1"
                  >
                    شروط الخدمة
                  </Link>
                  و
                  <Link
                    href="/privacy"
                    className="text-yellow-600 hover:text-yellow-700 mx-1"
                  >
                    سياسة الخصوصية
                  </Link>
                </p>

                <div className="mt-6 flex items-center justify-center text-sm text-gray-600">
                  <ShoppingCart size={16} className="mr-2" />
                  جميع المعاملات آمنة ومشفرة
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex flex-col items-center max-w-md mx-auto">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <ShoppingCart className="text-yellow-500" size={48} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                سلة المشتريات فارغة
              </h2>
              <p className="text-gray-600 mb-6">
                لم تقم بإضافة أي دورات إلى سلة المشتريات بعد. استكشف دوراتنا
                واختر الدورة التي تناسبك.
              </p>
              <Link
                href="/courses"
                className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-lg transition-colors"
              >
                تصفح الدورات
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
