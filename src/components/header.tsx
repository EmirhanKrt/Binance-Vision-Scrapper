import { TypographyH1 } from "@/components/ui/typography-h1";
import { TypographyP } from "@/components/ui/typography-p";
import { TypographyLink } from "@/components/ui/typography-link";

export default function Header() {
  return (
    <header className="flex flex-col gap-4">
      <TypographyH1>Binace Vision Scrapper</TypographyH1>
      <TypographyP>
        With just a few clicks, fetch and merge Binance Exchange`&apos;s
        historical data into a CSV file from{" "}
        <TypographyLink href="https://data.binance.vision">
          data.binance.vision
        </TypographyLink>
      </TypographyP>
    </header>
  );
}
