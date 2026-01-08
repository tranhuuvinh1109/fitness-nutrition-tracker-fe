"use client";

import { HEADERS } from "@/constants";
import { MessageCircle, TextAlignJustify, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header>
      <div className="hidden items-center gap-4 md:flex">
        <MessageCircle className="h-10 w-10 text-[#0A4FD5]" />
        {HEADERS.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className="px-4 py-2 text-base font-medium hover:text-[#0A4FD5]"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex justify-end md:hidden">
        <Popover onOpenChange={(open) => setIsOpen(open)}>
          <PopoverTrigger>
            <button className="rounded bg-[#0A4FD5] px-3 py-2 text-white">
              {isOpen ? <X className="h-5 w-5" /> : <TextAlignJustify className="h-5 w-5" />}
            </button>
          </PopoverTrigger>

          <PopoverContent className="flex w-56 flex-col gap-4">
            {HEADERS.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className="px-2.5 py-1 text-base font-medium hover:text-[#0A4FD5]"
              >
                {item.label}
              </Link>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};
