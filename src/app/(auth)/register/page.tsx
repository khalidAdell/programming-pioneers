"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import {
  Mail,
  Lock,
  User,
  EyeOff,
  Eye,
  AlertCircle,
  UserPlus,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

// Validation schema using Yup
const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("الاسم الكامل مطلوب")
    .min(2, "الاسم قصير جداً"),
  email: yup
    .string()
    .required("البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صحيح"),
  password: yup
    .string()
    .required("كلمة المرور مطلوبة")
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، رقم، ورمز خاص"
    ),
  confirmPassword: yup
    .string()
    .required("تأكيد كلمة المرور مطلوب")
    .oneOf([yup.ref("password")], "كلمات المرور غير متطابقة"),
  agreeTerms: yup
    .boolean()
    .oneOf([true], "يجب الموافقة على الشروط والأحكام")
    .required("يجب الموافقة على الشروط والأحكام"),
});

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData): Promise<void> => {
    setIsSubmitting(true);
    setSignupError("");

    try {
      // Replace with actual signup API call
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));

      // Simulate successful signup
      console.log("Signup data:", data);

      // Redirect to login page or dashboard
      window.location.href = "/login";
    } catch {
      setSignupError("حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                إنشاء حساب جديد
              </h1>
              <p className="text-gray-600">
                انضم إلى منصة رواد التعليمية وابدأ رحلة التعلم
              </p>
            </div>

            {signupError && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center gap-2 text-right">
                <AlertCircle size={20} />
                <p>{signupError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="block text-gray-700 text-right"
                >
                  الاسم الكامل <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        id="fullName"
                        type="text"
                        placeholder="أدخل اسمك الكامل"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.fullName ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-yellow-500 focus:border-transparent pr-10 text-right`}
                      />
                    )}
                  />
                  <User
                    className="absolute top-3 right-3 text-gray-400"
                    size={20}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1 text-right">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

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

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 text-right"
                >
                  تأكيد كلمة المرور <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="أدخل كلمة المرور مرة أخرى"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-gray-300"
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-3 left-3 text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1 text-right">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <Controller
                  name="agreeTerms"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="agreeTerms"
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
                <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                  أوافق على{" "}
                  <Link
                    href="/terms"
                    className="text-yellow-600 hover:text-yellow-500"
                  >
                    الشروط والأحكام
                  </Link>{" "}
                  و{" "}
                  <Link
                    href="/privacy"
                    className="text-yellow-600 hover:text-yellow-500"
                  >
                    سياسة الخصوصية
                  </Link>
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="text-red-500 text-sm mt-1 text-right">
                  {errors.agreeTerms.message}
                </p>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "جارِ إنشاء الحساب..." : "إنشاء حساب"}
                  <UserPlus size={18} />
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                لديك حساب بالفعل؟{" "}
                <Link
                  href="/login"
                  className="text-yellow-600 hover:text-yellow-500 font-medium"
                >
                  تسجيل الدخول
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

export default Register;
