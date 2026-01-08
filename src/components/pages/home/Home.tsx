import { Header } from "@/components/header";
import { MessageCircle, Search, Send, User } from "lucide-react";
import Link from "next/link";

interface HomeProps {
  //   onNavigate: (page: string) => void;
  user?: { email: string; name: string; role: "user" | "admin" } | null;
}

export const HomePage = ({ user }: HomeProps) => {
  console.log("User on HomePage:", user);
  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-[1440px] px-8 py-6">
          <Header />
        </div>
      </div>

      {/* Hero Content */}
      <div className="mx-auto px-4 py-8 md:max-w-[1440px] md:px-8 md:py-16">
        <div className="flex w-full flex-col items-center justify-between gap-12 md:flex-row">
          <div className="md:max-w-[680px] md:flex-1">
            <h1 className="mb-6 text-[#111827]">AI hỗ trợ tư vấn thủ tục hành chính 24/7</h1>
            <p className="mb-12 text-[#111827] opacity-80">
              Giải đáp hồ sơ, giấy tờ, quy trình hành chính nhanh chóng và chính xác.
            </p>
            <div className="flex flex-wrap gap-4">
              <input
                type="text"
                placeholder="Ví dụ: Thủ tục đăng ký kinh doanh cần gì?"
                className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-4 focus:border-[#0A4FD5] focus:outline-none"
              />
              <button
                // onClick={() => onNavigate("chat")}
                className="flex items-center gap-2 rounded-lg bg-[#3DDC84] px-8 py-4 text-[#111827] transition-colors hover:bg-[#2ac972]"
              >
                <Send className="h-5 w-5" />
                Trò chuyện ngay
              </button>
            </div>
          </div>
          <div className="flex h-[360px] w-full flex-1 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0A4FD5]/10 to-[#3DDC84]/10 py-8 md:max-w-[560px] md:py-0">
            <div className="text-center">
              <MessageCircle className="mx-auto mb-4 h-16 w-16 text-[#0A4FD5] opacity-50 md:h-32 md:w-32" />
              <div className="text-[#111827] opacity-60">Robot AI</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-[1440px] px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Link
            href={"thu-tuc"}
            className="cursor-pointer rounded-xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <Search className="mb-4 h-12 w-12 text-[#0A4FD5]" />
            <h3 className="mb-2 text-[#111827]">Tra cứu thủ tục</h3>
            <p className="text-[#111827] opacity-70">Tìm nhanh thủ tục theo từ khóa</p>
          </Link>
          <Link
            href={"chat"}
            className="cursor-pointer rounded-xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <MessageCircle className="mb-4 h-12 w-12 text-[#0A4FD5]" />
            <h3 className="mb-2 text-[#111827]">Chat với AI</h3>
            <p className="text-[#111827] opacity-70">
              Nhận hướng dẫn chi tiết cho trường hợp của bạn
            </p>
          </Link>
          <Link
            href={"tai-khoan"}
            className="cursor-pointer rounded-xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <User className="mb-4 h-12 w-12 text-[#0A4FD5]" />
            <h3 className="mb-2 text-[#111827]">Quản lý tài khoản</h3>
            <p className="text-[#111827] opacity-70">Lưu thủ tục yêu thích và theo dõi lịch sử</p>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 bg-white">
        <div className="mx-auto max-w-[1440px] px-8 py-8">
          <div className="mb-4 text-[#111827] opacity-70">
            Liên hệ | Điều khoản | Chính sách bảo mật
          </div>
          <div className="flex items-center justify-between">
            <div className="text-[#111827] opacity-50">© 2025 GovAssist AI</div>
            <button
              //   onClick={() => onNavigate("mobile")}
              className="text-sm text-[#0A4FD5] hover:underline"
            >
              Xem giao diện mobile →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
