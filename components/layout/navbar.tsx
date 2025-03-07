"use client";
import { IoBook, IoBookmark, IoBookmarkOutline, IoBookOutline, IoFingerPrint } from "react-icons/io5";
import { AiFillHeart, AiFillPieChart, AiOutlineHeart, AiOutlinePieChart } from "react-icons/ai";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Navbar() {
  const t = useTranslations("MainLayout.Navbar");
  const navItems = [
    {
      id: 1,
      name: t("home"),
      path: "/",
      icon: IoBookOutline,
      activeIcon: IoBook,
    },
    {
      id: 2,
      name: t("favorites"),
      path: "/favorites",
      icon: AiOutlineHeart,
      activeIcon: AiFillHeart,
    },
    {
      id: 3,
      name: t("bookmarks"),
      path: "/bookmarks",
      icon: IoBookmarkOutline,
      activeIcon: IoBookmark,
    },
    {
      id: 3,
      name: t("rosary"),
      path: "/rosary",
      icon: IoFingerPrint,
      activeIcon: IoFingerPrint,
    },
  ];

  const curPath = usePathname();

  return (
    <nav className="flex md:flex-col flex-row md:justify-between items-center justify-center md:h-full w-full py-5 text-[1.7rem]">
      <TooltipProvider delayDuration={700}>
        <div className="flex items-center md:flex-col flex-row gap-7 md:gap-1">
          {navItems.map(({ id, icon: Icon, path, name, activeIcon: ActiveIcon }) => {
            const isActive = (curPath.startsWith(path) && path !== "/") || curPath === path;

            return (
              <Tooltip key={id}>
                <TooltipTrigger>
                  <Link className={cn("rounded-full block md:p-2 p-2.5 *:size-6 md:*:size-7", isActive && "md:text-primary text-white md:bg-inherit bg-primary")} href={path}>
                    {isActive ? <ActiveIcon /> : <Icon />}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>{name}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    </nav>
  );
}
