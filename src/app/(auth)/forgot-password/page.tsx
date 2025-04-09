"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { Mail, Send, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

interface ForgotPasswordFormData {
  email: string;
}

// Validation schema using Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .required("البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صحيح"),
});

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetError, setResetError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData): Promise<void> => {
    setIsSubmitting(true);
    setResetError("");

    try {
      // Replace with actual password reset API call
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));

      // Simulate successful submission
      console.log("Password reset requested for:", data.email);
      setIsSubmitted(true);
    } catch (error) {
      setResetError(
        "حدث خطأ أثناء طلب إعادة تعيين كلمة المرور. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-sm p-8">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle className="text-green-500 mb-4" size={64} />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  تم إرسال رابط إعادة تعيين كلمة المرور
                </h2>
                <p className="text-gray-600 mb-6">
                  لقد قمنا بإرسال رابط إعادة تعيين كلمة المرور إلى بريدك
                  الإلكتروني. يرجى التحقق من بريدك الوارد واتباع التعليمات.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/login"
                    className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft size={18} />
                    العودة إلى تسجيل الدخول
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    نسيت كلمة المرور؟
                  </h1>
                  <p className="text-gray-600">
                    أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة
                    المرور الخاصة بك
                  </p>
                </div>

                {resetError && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center gap-2 text-right">
                    <AlertCircle size={20} />
                    <p>{resetError}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 text-right"
                    >
                      البريد الإلكتروني <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            id="email"
                            type="email"
                            placeholder="أدخل بريدك الإلكتروني"
                            className={`w-full px-4 py-3 rounded-lg border ${
                              errors.email
                                ? "border-red-500"
                                : "border-gray-300"
                            } focus:ring-2 focus:ring-yellow-500 focus:border-transparent pr-10 text-right`}
                          />
                        )}
                      />
                      <Mail
                        className="absolute top-3 right-3 text-gray-400"
                        size={20}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1 text-right">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting
                        ? "جارِ الإرسال..."
                        : "إرسال رابط إعادة التعيين"}
                      <Send size={18} />
                    </button>

                    <Link
                      href="/login"
                      className="block w-full text-center text-gray-600 hover:text-yellow-600 transition-colors"
                    >
                      العودة إلى تسجيل الدخول
                    </Link>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
