"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Mail, Lock, EyeOff, Eye, AlertCircle, UserCheck } from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";

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

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

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
      // Sign in with credentials using Next-Auth
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/",
      });

      if (result?.error) {
        setLoginError(
          "فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك والمحاولة مرة أخرى."
        );
        return;
      }

      if (data.rememberMe) {
        localStorage.setItem("userEmail", data.email);
      } else {
        localStorage.removeItem("userEmail");
      }

      // Redirect after successful login
      router.push(callbackUrl);
    } catch {
      setLoginError("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // GitHub sign in handler
  const handleGitHubSignIn = async () => {
    await signIn("github", { callbackUrl });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
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
                        className={`w-full px-4 text-gray-600 py-3 rounded-lg border ${
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
                        className={`w-full px-4 text-gray-600 py-3 rounded-lg border ${
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

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  أو تسجيل الدخول باستخدام
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGitHubSignIn}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                تسجيل الدخول باستخدام GitHub
              </button>
            </div>

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
    </div>
  );
};

export default Login;
