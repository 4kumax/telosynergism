"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale() as Locale;

  const handleSwitch = (nextLocale: Locale) => {
    const search = searchParams.toString();
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const nextPath = pathname.startsWith(`/${locale}`)
      ? pathname.replace(`/${locale}`, `/${nextLocale}`)
      : `/${nextLocale}${pathname}`;
    const href = `${nextPath}${search ? `?${search}` : ""}${hash}`;

    document.cookie = `last_locale=${nextLocale}; path=/; max-age=31536000`;
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;
    router.push(href);
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((item) => (
        <Button
          key={item}
          variant={item === locale ? "default" : "outline"}
          size="sm"
          onClick={() => handleSwitch(item)}
        >
          {localeLabels[item]}
        </Button>
      ))}
    </div>
  );
}
