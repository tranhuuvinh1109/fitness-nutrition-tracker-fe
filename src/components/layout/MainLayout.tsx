import { PropsWithChildren } from "react";
import { Header } from "../header";
import { Toaster } from "sonner";

type MainLayoutProps = PropsWithChildren;

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <div className="bg-background">
        {/* Header */}
        <Header />
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
      <Toaster />
    </>
  );
};
