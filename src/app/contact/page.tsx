"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  User,
  MessageSquare,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
}

// Validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("الاسم مطلوب").min(2, "الاسم قصير جداً"),
  email: yup
    .string()
    .required("البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صحيح"),
  phone: yup
    .string()
    .matches(/^[0-9]{10,15}$/, "رقم الهاتف غير صحيح")
    .nullable(),
  subject: yup.string().required("الموضوع مطلوب"),
  message: yup
    .string()
    .required("الرسالة مطلوبة")
    .min(10, "الرسالة قصيرة جداً"),
});

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: undefined,
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData): Promise<void> => {
    setIsSubmitting(true);
    setError("");

    // Simulate API call
    try {
      // Replace with actual API call
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", data);
      setIsSubmitted(true);
      reset();
    } catch {
      setError("حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة مرة أخرى");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-indigo-900 to-purple-800">
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400 rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              تواصل <span className="text-yellow-400">معنا</span>
            </h1>
            <p className="text-lg text-gray-200 mb-4 max-w-2xl mx-auto">
              نحن هنا للإجابة على استفساراتك ومساعدتك في رحلتك التعليمية
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Form */}
          <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-sm p-8">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="text-green-500 mb-4" size={64} />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  تم إرسال رسالتك بنجاح
                </h2>
                <p className="text-gray-600 mb-6">
                  شكراً للتواصل معنا! سيقوم فريقنا بالرد عليك في أقرب وقت ممكن.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-right">
                  أرسل لنا رسالة
                </h2>

                {error && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center gap-2 text-right">
                    <AlertCircle size={20} />
                    <p>{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 text-right"
                      >
                        الاسم الكامل <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Controller
                          name="name"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              id="name"
                              type="text"
                              placeholder="أدخل اسمك الكامل"
                              className={`w-full px-4 py-3 rounded-lg border ${
                                errors.name
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } focus:ring-2 focus:ring-yellow-500 focus:border-transparent pr-10 text-right`}
                            />
                          )}
                        />
                        <User
                          className="absolute top-3 right-3 text-gray-400"
                          size={20}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1 text-right">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 text-right"
                      >
                        البريد الإلكتروني{" "}
                        <span className="text-red-500">*</span>
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

                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="block text-gray-700 text-right"
                      >
                        رقم الهاتف
                      </label>
                      <div className="relative">
                        <Controller
                          name="phone"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              id="phone"
                              type="tel"
                              placeholder="أدخل رقم هاتفك"
                              value={field.value || ""}
                              className={`w-full px-4 py-3 rounded-lg border ${
                                errors.phone
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } focus:ring-2 focus:ring-yellow-500 focus:border-transparent pr-10 text-right`}
                            />
                          )}
                        />
                        <Phone
                          className="absolute top-3 right-3 text-gray-400"
                          size={20}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 text-right">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="block text-gray-700 text-right"
                      >
                        الموضوع <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Controller
                          name="subject"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              id="subject"
                              type="text"
                              placeholder="موضوع الرسالة"
                              className={`w-full px-4 py-3 rounded-lg border ${
                                errors.subject
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } focus:ring-2 focus:ring-yellow-500 focus:border-transparent pr-10 text-right`}
                            />
                          )}
                        />
                        <MessageSquare
                          className="absolute top-3 right-3 text-gray-400"
                          size={20}
                        />
                      </div>
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1 text-right">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 text-right"
                    >
                      الرسالة <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="message"
                      control={control}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          id="message"
                          rows={6}
                          placeholder="اكتب رسالتك هنا..."
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.message
                              ? "border-red-500"
                              : "border-gray-300"
                          } focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-right`}
                        ></textarea>
                      )}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1 text-right">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2 ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? "جارِ الإرسال..." : "إرسال الرسالة"}
                      <Send size={18} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Contact Information */}
          <div className="w-full lg:w-1/3 space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-right">
                معلومات التواصل
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-right">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Mail className="text-yellow-600" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">البريد الإلكتروني</p>
                    <p className="text-gray-800 font-medium">
                      support@rowad.edu
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Phone className="text-yellow-600" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">رقم الهاتف</p>
                    <p className="text-gray-800 font-medium">
                      +20 1234 567 890
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <MapPin className="text-yellow-600" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">العنوان</p>
                    <p className="text-gray-800 font-medium">
                      القاهرة، مصر
                      <br />
                      123 ايفينت بلازا , حي الاعمال, القاهرة, مصر
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-right">
                الأسئلة الشائعة
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-700 mb-1 text-right">
                    كيف يمكنني التسجيل في دورة؟
                  </h4>
                  <p className="text-gray-600 text-right">
                    يمكنك التسجيل في أي دورة من خلال صفحة الدورة نفسها بالضغط
                    على زر &quot;إضافة إلى السلة&quot; ثم إكمال عملية الدفع.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-700 mb-1 text-right">
                    هل يمكنني الحصول على شهادة بعد إكمال الدورة؟
                  </h4>
                  <p className="text-gray-600 text-right">
                    نعم، ستحصل على شهادة إتمام رقمية بعد إكمال جميع متطلبات
                    الدورة بنجاح.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-700 mb-1 text-right">
                    ما هي سياسة استرداد الأموال؟
                  </h4>
                  <p className="text-gray-600 text-right">
                    يمكنك استرداد أموالك بشكل كامل خلال 7 أيام من تاريخ الشراء
                    إذا لم تكن راضياً عن الدورة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
