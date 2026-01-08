import { PropsWithChildren } from "react";
import { Header } from "../header";
import { Apple, Bot, Dumbbell, Home, TrendingUp, User } from "lucide-react";
import { Button } from "../ui";

type MainLayoutProps = PropsWithChildren;

const menuItems = [
  { id: "dashboard", label: "Trang chủ", icon: Home },
  { id: "nutrition", label: "Dinh dưỡng", icon: Apple },
  { id: "workout", label: "Tập luyện", icon: Dumbbell },
  { id: "coach", label: "AI Coach", icon: Bot },
  { id: "progress", label: "Tiến độ", icon: TrendingUp },
  { id: "profile", label: "Hồ sơ", icon: User },
];

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <Header />

      {/* Navigation */}
      <nav className="bg-background sticky top-[73px] z-10 border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  //   variant={currentPage === item.id ? "default" : "ghost"}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr,350px]">
          <div>{children}</div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t">
        <div className="container mx-auto px-4 py-6">
          <p className="text-muted-foreground text-center text-sm">
            FitTracker AI - Trợ lý sức khỏe thông minh của bạn 💪
          </p>
        </div>
      </footer>
    </div>
  );
};
