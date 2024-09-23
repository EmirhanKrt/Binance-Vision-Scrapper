"use client";

import { memo, useContext, useEffect, useMemo } from "react";

import { TypographyP } from "@/components/ui/typography-p";
import ComboBox from "@/components/ui/combo-box";
import TickerListContext from "@/contexts/ticker-list";

export default memo(function Ticker({
  disabled = true
}: {
  disabled: boolean;
}) {
  const { loading, tickerList, tickerHandler } = useContext(TickerListContext);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    tickerHandler(signal);

    return () => {
      controller.abort("Cleaned Ticker component's useEffect");
    };
  }, []);

  const cachedTickerList = useMemo(() => {
    return tickerList.map((ticker) => ({ value: ticker, label: ticker }));
  }, [tickerList]);

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
      valueList={cachedTickerList}
    />
  );
});
