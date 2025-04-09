import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">عن رواد</h3>
            <p className="text-slate-300 mb-4">
              منصة تعليمية متخصصة في تقديم دورات تدريبية في مجال البرمجة وتطوير
              الويب والتطبيقات والذكاء الاصطناعي بأيدي نخبة من المدربين
              المتخصصين
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-slate-300 hover:text-white">
                <Facebook size={20} />
              </Link>

              <Link href="#" className="text-slate-300 hover:text-white">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-slate-300 hover:text-white">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/courses"
                  className="text-slate-300 hover:text-white"
                >
                  جميع الدورات
                </Link>
              </li>
              <li>
                <Link
                  href="/instructors"
                  className="text-slate-300 hover:text-white"
                >
                  المدربون
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-300 hover:text-white">
                  المدونة
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-slate-300 hover:text-white"
                >
                  الفعاليات
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-300 hover:text-white">
                  الأسئلة الشائعة
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">تصنيفات الدورات</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/category/web"
                  className="text-slate-300 hover:text-white"
                >
                  تطوير الويب
                </Link>
              </li>
              <li>
                <Link
                  href="/category/mobile"
                  className="text-slate-300 hover:text-white"
                >
                  تطبيقات الجوال
                </Link>
              </li>
              <li>
                <Link
                  href="/category/ai"
                  className="text-slate-300 hover:text-white"
                >
                  الذكاء الاصطناعي
                </Link>
              </li>
              <li>
                <Link
                  href="/category/data"
                  className="text-slate-300 hover:text-white"
                >
                  قواعد البيانات
                </Link>
              </li>
              <li>
                <Link
                  href="/category/design"
                  className="text-slate-300 hover:text-white"
                >
                  التصميم
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">اتصل بنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail size={18} className="ml-2 text-slate-400" />
                <span className="text-slate-300">info@techacademy.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="ml-2 text-slate-400" />
                <span className="text-slate-300">+20-12-345-6789</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} className="ml-2 text-slate-400" />
                <span className="text-slate-300">القاهرة، مصر</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} رواد - جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
