import Link from "next/link";
import { getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { localeLabels, type Locale } from "@/lib/i18n";

type NavbarProps = {
  locale: Locale;
};

export default async function Navbar({ locale }: NavbarProps) {
  const t = await getTranslations({ locale, namespace: "nav" });

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/2-min`, label: t("twoMin") },
    { href: `/${locale}/manifest`, label: t("manifest") },
    { href: `/${locale}/model`, label: t("model") },
    { href: `/${locale}/metrics`, label: t("metrics") },
    { href: `/${locale}/practice`, label: t("practice") },
    { href: `/${locale}/applications`, label: t("applications") },
    { href: `/${locale}/faq`, label: t("faq") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href={`/${locale}`} className="text-sm font-semibold uppercase tracking-wide">
          Telosynergism <span className="text-muted-foreground">{localeLabels[locale]}</span>
        </Link>
        <nav className="hidden items-center gap-4 text-sm md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <div className="md:hidden">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/${locale}/2-min`}>{t("menuCta")}</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="border-t border-border md:hidden">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
