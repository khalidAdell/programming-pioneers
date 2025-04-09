"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { Mail, Lock, EyeOff, Eye, AlertCircle, UserCheck } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Validation schema using Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .required("البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صحيح"),
  password: yup
    .string()
    .required("كلمة المرور مطلوبة")
    .min(8, "كلمة المرور قصيرة جداً"),
  rememberMe: yup.boolean().default(false).required(),
});

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    setIsSubmitting(true);
    setLoginError("");

    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));

      console.log("Login attempt:", data);

      window.location.href = "/dashboard";
    } catch {
      setLoginError(
        "فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك والمحاولة مرة أخرى."
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
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                تسجيل الدخول
              </h1>
              <p className="text-gray-600">
                أهلاً بك مجدداً! يرجى تسجيل الدخول للوصول إلى حسابك
              </p>
            </div>

            {loginError && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center gap-2 text-right">
                <AlertCircle size={20} />
                <p>{loginError}</p>
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
                          errors.email ? "border-red-500" : "border-gray-300"
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

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-right"
                >
                  كلمة المرور <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="أدخل كلمة المرور"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-yellow-500 focus:border-transparent pr-10 text-right`}
                      />
                    )}
                  />
                  <Lock
                    className="absolute top-3 right-3 text-gray-400"
                    size={20}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-3 left-3 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 text-right">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href="/forgot-password"
                  className="text-sm text-yellow-600 hover:text-yellow-500"
                >
                  نسيت كلمة المرور؟
                </Link>
                <div className="flex items-center">
                  <Controller
                    name="rememberMe"
                    control={control}
                    render={({ field }) => (
                      <input
                        id="rememberMe"
                        type="checkbox"
                        className="h-4 w-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500 ml-2"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    )}
                  />
                  <label htmlFor="rememberMe" className="text-sm text-gray-700">
                    تذكرني
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "جارِ تسجيل الدخول..." : "تسجيل الدخول"}
                  <UserCheck size={18} />
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                ليس لديك حساب؟{" "}
                <Link
                  href="/register"
                  className="text-yellow-600 hover:text-yellow-500 font-medium"
                >
                  إنشاء حساب جديد
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
