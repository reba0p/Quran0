import { getTranslations } from "next-intl/server";
import SearchBar from "./search-bar";
import SelectLanguage from "@/components/select-Language";
import UserAvatar from "@/components/user-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Logo from "@/components/logo";
import Link from "next/link";
import { ThemeBtn } from "@/components/theme-btn";
import { Settings } from "lucide-react";

export default async function Header() {
  const t = await getTranslations("MainLayout.Header");

  return (
    <header className="flex items-center sm:justify-between gap-3 p-6 flex-shrink-0 h-[75px] shadow-[-20px_4px_20px_-0px_rgba(0,0,0,0.3)] shadow-muted ltr:shadow-[50px_6px_20px_-0px_rgba(0,0,0,0.3)] ltr:shadow-muted z-10">
      
      <Link className="md:hidden block ltr:mr-auto rtl:ml-auto sm:mr-0" href="/">
        <Logo />
      </Link>


      <Link href="/" className="ltr:mr-auto rtl:ml-auto">
        <h1 className="text-2xl font-extrabold md:hidden">{t("title")}</h1>
      </Link>

      
      <SearchBar />
      <div className="lg:flex hidden items-center gap-2.5">
        <SelectLanguage />
        <ThemeBtn />
      </div>

      <div className="lg:hidden">
          <Popover>
            <PopoverTrigger>
              <Settings />
            </PopoverTrigger>
            <PopoverContent className="space-y-2">
              <div className="flex items-center gap-2 justify-center">
                <SelectLanguage />
                <ThemeBtn />
              </div>
            </PopoverContent>
          </Popover>
      </div>
    </header>
  );
}
