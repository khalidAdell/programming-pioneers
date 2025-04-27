"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  ChevronLeft,
  Lock,
  AlertCircle,
  Shield,
  CheckCircle,
  Info,
} from "lucide-react";
import { Course } from "../types/courses";

const CheckoutPage = () => {
  const course: Course = {
    id: 1,
    title: "الدورة التدريبية المتكاملة",
    price: "199.99 دولار",
    imageUrl: "/course-image.jpg",
    instructor: "أحمد محمد",
    description: "",
    duration: "",
    level: "",
    students: 0,
    rating: 0,
    category: "",
    tags: [],
  };
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<string>("creditCard");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [walletType, setWalletType] = useState<string>("vodafoneCash");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCardNumber = (value: string) => {
    const rawValue = value.replace(/\s/g, "");
    const formattedValue = rawValue.replace(/(\d{4})/g, "$1 ").trim();
    return formattedValue.substring(0, 19); // limit to 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    const rawValue = value.replace(/\D/g, "");
    if (rawValue.length <= 2) return rawValue;
    return `${rawValue.substring(0, 2)}/${rawValue.substring(2, 4)}`;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(formatExpiryDate(e.target.value));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (paymentMethod === "creditCard") {
      if (!cardNumber) {
        newErrors.cardNumber = "يرجى إدخال رقم البطاقة";
      } else if (cardNumber.replace(/\s/g, "").length !== 16) {
        newErrors.cardNumber = "رقم البطاقة يجب أن يكون 16 رقم";
      }

      if (!cardName) {
        newErrors.cardName = "يرجى إدخال الاسم على البطاقة";
      }

      if (!expiryDate) {
        newErrors.expiryDate = "يرجى إدخال تاريخ انتهاء الصلاحية";
      } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        newErrors.expiryDate = "صيغة غير صحيحة (MM/YY)";
      }

      if (!cvv) {
        newErrors.cvv = "يرجى إدخال رمز CVV";
      } else if (!/^\d{3,4}$/.test(cvv)) {
        newErrors.cvv = "رمز CVV غير صحيح";
      }
    } else if (paymentMethod === "eWallet") {
      if (!phoneNumber) {
        newErrors.phoneNumber = "يرجى إدخال رقم الهاتف";
      } else if (!/^01[0125][0-9]{8}$/.test(phoneNumber)) {
        newErrors.phoneNumber = "رقم هاتف غير صحيح";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setPaymentSuccess(true);

      // Redirect to success page after 2 seconds
      setTimeout(() => {
        router.push("/payment/success");
      }, 2000);
    } catch {
      setPaymentSuccess(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const coursePrice = course?.price || "199.99 دولار";
  const courseName = course?.title || "الدورة التدريبية المتكاملة";

  const getWalletLogo = () => {
    switch (walletType) {
      case "vodafoneCash":
        return "/vodafone-cash.png"; // Replace with actual path
      case "orangeCash":
        return "/orange-cash.png"; // Replace with actual path
      case "etisalatCash":
        return "/etisalat-cash.png"; // Replace with actual path
      case "weePay":
        return "/wee-pay.png"; // Replace with actual path
      case "fawry":
        return "/fawry.png"; // Replace with actual path
      default:
        return "/wallet-icon.png"; // Replace with actual path
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Link
          href="/cart"
          className="flex items-center text-gray-600 hover:text-yellow-600 mb-8 transition-colors w-fit"
        >
          <ChevronLeft size={20} />
          <span>العودة إلى السلة</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Payment Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-6 text-right">
                إتمام الدفع
              </h1>

              {paymentSuccess === true && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3 text-right">
                  <CheckCircle
                    className="text-green-500 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="text-green-800 font-bold">تم الدفع بنجاح!</p>
                    <p className="text-green-700">
                      جاري تحويلك إلى صفحة التأكيد...
                    </p>
                  </div>
                </div>
              )}

              {paymentSuccess === false && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3 text-right">
                  <AlertCircle
                    className="text-red-500 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="text-red-800 font-bold">فشلت عملية الدفع</p>
                    <p className="text-red-700">
                      يرجى التحقق من بيانات الدفع والمحاولة مرة أخرى.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("creditCard")}
                  className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                    paymentMethod === "creditCard"
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <CreditCard
                    size={24}
                    className={
                      paymentMethod === "creditCard"
                        ? "text-yellow-500"
                        : "text-gray-500"
                    }
                  />
                  <div className="text-right">
                    <p
                      className={`font-bold ${
                        paymentMethod === "creditCard"
                          ? "text-yellow-700"
                          : "text-gray-700"
                      }`}
                    >
                      بطاقة ائتمان
                    </p>
                    <p className="text-sm text-gray-500">
                      فيزا، ماستركارد، ميزة
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("eWallet")}
                  className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                    paymentMethod === "eWallet"
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={getWalletLogo()}
                    alt="E-Wallet"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <div className="text-right">
                    <p
                      className={`font-bold ${
                        paymentMethod === "eWallet"
                          ? "text-yellow-700"
                          : "text-gray-700"
                      }`}
                    >
                      المحافظ الإلكترونية
                    </p>
                    <p className="text-sm text-gray-500">
                      فودافون كاش، أورانج، اتصالات
                    </p>
                  </div>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {paymentMethod === "creditCard" && (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="cardNumber"
                          className="block text-gray-700 font-medium mb-2 text-right"
                        >
                          رقم البطاقة
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="XXXX XXXX XXXX XXXX"
                            className={`w-full py-3 px-4 border text-gray-700 rounded-lg text-right ${
                              errors.cardNumber
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            maxLength={19}
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <Image
                              src="/visa-icon.png"
                              alt="Visa"
                              width={32}
                              height={20}
                            />
                          </div>
                        </div>
                        {errors.cardNumber && (
                          <p className="text-red-500 text-sm mt-1 text-right">
                            {errors.cardNumber}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="cardName"
                          className="block text-gray-700 font-medium mb-2 text-right"
                        >
                          الاسم على البطاقة
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="الاسم الكامل كما يظهر على البطاقة"
                          className={`w-full py-3 px-4 border text-gray-700 rounded-lg text-right ${
                            errors.cardName
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors.cardName && (
                          <p className="text-red-500 text-sm mt-1 text-right">
                            {errors.cardName}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <label
                            htmlFor="expiryDate"
                            className="block text-gray-700 font-medium mb-2 text-right"
                          >
                            تاريخ الانتهاء
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            value={expiryDate}
                            onChange={handleExpiryChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            className={`w-full py-3 px-4 border text-gray-700 rounded-lg text-right ${
                              errors.expiryDate
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.expiryDate && (
                            <p className="text-red-500 text-sm mt-1 text-right">
                              {errors.expiryDate}
                            </p>
                          )}
                        </div>

                        <div className="flex-1">
                          <label
                            htmlFor="cvv"
                            className="block text-gray-700 font-medium mb-2 text-right"
                          >
                            رمز الأمان (CVV)
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              id="cvv"
                              value={cvv}
                              onChange={(e) =>
                                setCvv(e.target.value.replace(/\D/g, ""))
                              }
                              placeholder="123"
                              maxLength={4}
                              className={`w-full py-3 px-4 border text-gray-700 rounded-lg text-right ${
                                errors.cvv
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            <button
                              type="button"
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                              title="رمز الأمان الموجود خلف البطاقة"
                            >
                              <Info size={18} />
                            </button>
                          </div>
                          {errors.cvv && (
                            <p className="text-red-500 text-sm mt-1 text-right">
                              {errors.cvv}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {paymentMethod === "eWallet" && (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2 text-right">
                          اختر المحفظة الإلكترونية
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          <button
                            type="button"
                            onClick={() => setWalletType("vodafoneCash")}
                            className={`p-3 border rounded-lg flex items-center justify-center ${
                              walletType === "vodafoneCash"
                                ? "border-yellow-500 bg-yellow-50"
                                : "border-gray-200"
                            }`}
                          >
                            <div className="flex flex-col items-center gap-1 text-gray-700">
                              <Image
                                src="/vodafone-cash.png"
                                alt="Vodafone Cash"
                                width={40}
                                height={40}
                              />
                              <span className="text-sm font-medium">
                                فودافون كاش
                              </span>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setWalletType("orangeCash")}
                            className={`p-3 border rounded-lg flex items-center justify-center ${
                              walletType === "orangeCash"
                                ? "border-yellow-500 bg-yellow-50"
                                : "border-gray-200"
                            }`}
                          >
                            <div className="flex flex-col items-center gap-1 text-gray-700">
                              <Image
                                src="/orange-cash.png"
                                alt="Orange Cash"
                                width={40}
                                height={40}
                              />
                              <span className="text-sm font-medium">
                                أورانج كاش
                              </span>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setWalletType("etisalatCash")}
                            className={`p-3 border rounded-lg flex items-center justify-center ${
                              walletType === "etisalatCash"
                                ? "border-yellow-500 bg-yellow-50"
                                : "border-gray-200"
                            }`}
                          >
                            <div className="flex flex-col items-center gap-1 text-gray-700">
                              <Image
                                src="/etisalat-cash.png"
                                alt="Etisalat Cash"
                                width={40}
                                height={40}
                              />
                              <span className="text-sm font-medium">
                                اتصالات كاش
                              </span>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setWalletType("weePay")}
                            className={`p-3 border rounded-lg flex items-center justify-center ${
                              walletType === "weePay"
                                ? "border-yellow-500 bg-yellow-50"
                                : "border-gray-200"
                            }`}
                          >
                            <div className="flex flex-col items-center gap-1 text-gray-700">
                              <Image
                                src="/wee-pay.png"
                                alt="WE Pay"
                                width={40}
                                height={40}
                              />
                              <span className="text-sm font-medium">
                                WE Pay
                              </span>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setWalletType("fawry")}
                            className={`p-3 border rounded-lg flex items-center justify-center ${
                              walletType === "fawry"
                                ? "border-yellow-500 bg-yellow-50"
                                : "border-gray-200"
                            }`}
                          >
                            <div className="flex flex-col items-center gap-1 text-gray-700">
                              <Image
                                src="/fawry.png"
                                alt="Fawry"
                                width={40}
                                height={40}
                              />
                              <span className="text-sm font-medium">فوري</span>
                            </div>
                          </button>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="phoneNumber"
                          className="block text-gray-700 font-medium mb-2 text-right"
                        >
                          رقم الهاتف
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) =>
                              setPhoneNumber(e.target.value.replace(/\D/g, ""))
                            }
                            placeholder="01XXXXXXXXX"
                            maxLength={11}
                            className={`w-full py-3 px-4 border text-gray-700 rounded-lg text-right ${
                              errors.phoneNumber
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                        </div>
                        {errors.phoneNumber && (
                          <p className="text-red-500 text-sm mt-1 text-right">
                            {errors.phoneNumber}
                          </p>
                        )}
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Info
                            className="text-blue-500 flex-shrink-0 mt-1"
                            size={20}
                          />
                          <div className="text-right">
                            <p className="text-blue-800 font-bold">
                              كيفية الدفع باستخدام{" "}
                              {walletType === "vodafoneCash"
                                ? "فودافون كاش"
                                : walletType === "orangeCash"
                                ? "أورانج كاش"
                                : walletType === "etisalatCash"
                                ? "اتصالات كاش"
                                : walletType === "weePay"
                                ? "WE Pay"
                                : "فوري"}
                              :
                            </p>
                            <p className="text-blue-700">
                              سيتم إرسال طلب دفع إلى رقم هاتفك المسجل. يرجى
                              التأكد من وجود رصيد كافي والالتزام بالتعليمات على
                              شاشة هاتفك لإتمام عملية الدفع.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex items-center gap-2 pt-4">
                  <Lock size={16} className="text-gray-500" />
                  <p className="text-sm text-gray-600">
                    جميع معلومات الدفع الخاصة بك مشفرة وآمنة
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    isProcessing ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      جاري معالجة الدفع...
                    </>
                  ) : (
                    <>إتمام الدفع - {coursePrice}</>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-right">
                ملخص الطلب
              </h2>

              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {course?.imageUrl ? (
                      <Image
                        src={course.imageUrl}
                        alt={courseName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <Image
                          src="/placeholder-course.png"
                          alt="Course"
                          width={48}
                          height={48}
                          className="opacity-50"
                        />
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <h3 className="font-bold text-gray-800">{courseName}</h3>
                    <p className="text-gray-600">
                      بواسطة {course?.instructor || "المدرب"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">سعر الدورة</span>
                  <span className="font-medium text-gray-900">
                    {coursePrice}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">الضريبة (14%)</span>
                  <span className="font-medium text-gray-900">27.99 دولار</span>
                </div>

                <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                  <span className="font-bold text-gray-900">المجموع</span>
                  <span className="font-bold text-yellow-600">
                    227.98 دولار
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-3 text-right">
                  سياسة الاسترداد:
                </h3>
                <p className="text-gray-700 text-sm text-right">
                  يمكنك استرداد المبلغ المدفوع بالكامل خلال 5 أيام من تاريخ
                  الشراء إذا لم تكن راضياً عن الدورة.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-600">
                <Shield size={18} className="text-gray-500" />
                <p>دفع آمن 100%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
