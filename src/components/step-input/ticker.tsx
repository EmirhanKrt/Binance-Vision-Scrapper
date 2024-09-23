"use client";

import { useMemo } from "react";

import useAvailableTickers from "@/hooks/use-available-tickers";

import { TypographyP } from "@/components/ui/typography-p";
import ComboBox from "@/components/ui/combo-box";

export default function Ticker({ disabled = true }: { disabled: boolean }) {
  const { tickers, loading } = useAvailableTickers();

  const cachedTickers = useMemo(() => {
    return tickers.map((ticker) => ({ value: ticker, label: ticker }));
  }, [tickers]);

  if (loading) {
    return <TypographyP>Loading available tickers...</TypographyP>;
  }

  return (
    <ComboBox
      label="Ticker"
      id="Ticker"
      name="Ticker"
      disabled={disabled}
      searchable={true}
      valueList={cachedTickers}
    />
  );
}
