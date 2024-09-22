import dynamic from "next/dynamic";

import { TypographyP } from "@/components/ui/typography-p";
import { TypographyLink } from "@/components/ui/typography-link";

const ThemeSwitcher = dynamic(() => import("@/components/theme-switcher"), {
  ssr: false
});

export default function Footer() {
  return (
    <footer className="flex justify-between">
      <TypographyP>
        Made by{" "}
        <TypographyLink href="https://emirhankurt.com">Emirhan</TypographyLink>
      </TypographyP>
      <ThemeSwitcher />
    </footer>
  );
}
