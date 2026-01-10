"use client";

import { Dumbbell, LogOut } from "lucide-react";
import { Button } from "../ui";
import { usePathname } from "next/navigation";
import { HEADER_PATH_HIDE, HEADERS } from "@/constants";

export const Header = () => {
  const pathname = usePathname();

  const isHidden = HEADER_PATH_HIDE.some((path) => pathname.startsWith(path));

  if (isHidden) {
    return null;
  }

  return (
    <>
      <header className="bg-background sticky top-0 z-10 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Dumbbell className="text-primary h-8 w-8" />
              <h1 className="text-2xl">FitTracker AI</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground hidden text-sm sm:inline">
                {"user"} • {"58"}kg
              </span>
              <Button variant="ghost" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Đăng xuất</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <nav className="bg-background sticky top-[73px] z-10 border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {HEADERS.map((item) => {
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
    </>
  );
};
