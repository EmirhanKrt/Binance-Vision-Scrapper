import { memo, useEffect, useMemo } from "react";

import useAvailableTickerList from "@/hooks/use-available-ticker-list";

import { TypographyP } from "@/components/ui/typography-p";
import ComboBox from "@/components/ui/combo-box";

export default memo(function Ticker({
  disabled = true
}: {
  disabled: boolean;
}) {
  const { loading, tickerList, tickerHandler } = useAvailableTickerList();

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
