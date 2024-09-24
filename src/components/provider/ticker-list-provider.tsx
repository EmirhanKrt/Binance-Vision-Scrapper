"use client";

import { useMemo, useState } from "react";

import { AVAILABLE_TICKER_LIST_CHECK_URL } from "@/lib/constants";
import { MarketEnum } from "@/lib/enums";
import { fetchDocument, generateRequestUrl } from "@/lib/utils/fetch-document";

import TickerListContext from "@/contexts/ticker-list";

import useFormData from "@/hooks/use-form-data";

function filterTickerFromPrefix(searchValue: string, content: string) {
  return content.replace(searchValue, "").split("/")[0];
}

export default function TickerListProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const FormData = useFormData();

  const [tickerList, setTickerList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const requestUrl = useMemo(() => {
    const requestUrlParts = [
      AVAILABLE_TICKER_LIST_CHECK_URL,
      FormData.Market,
      FormData.DataInterval,
      FormData.Data
    ];

    if (
      FormData.Market === MarketEnum.FUTURES &&
      FormData.hasOwnProperty("FuturesType")
    ) {
      requestUrlParts.splice(2, 0, FormData["FuturesType"]);
    }

    return requestUrlParts.join("/");
  }, [FormData]);

  async function getAvailableTicker(
    tickerList: string[] = [],
    marker: string = "",
    signal: AbortSignal
  ) {
    const data = await fetchDocument(
      generateRequestUrl(requestUrl, marker),
      signal
    );
    if (!data) return tickerList;

    const prefix = data.querySelector("Prefix");
    if (!prefix) return tickerList;

    const prefixTextContent = prefix.textContent;
    if (!prefixTextContent) return tickerList;

    const prefixes = Array.from(
      data.querySelectorAll("CommonPrefixes > Prefix")
    )
      .map((prefix) => prefix.textContent)
      .filter(Boolean)
      .map((prefixText) =>
        filterTickerFromPrefix(prefixTextContent, prefixText!)
      );

    tickerList = [...tickerList, ...prefixes];

    const nextMarker = data.querySelector("NextMarker");
    if (nextMarker && nextMarker.textContent) {
      return await getAvailableTicker(
        tickerList,
        nextMarker.textContent,
        signal
      );
    }

    return tickerList;
  }

  async function tickerHandler(signal: AbortSignal) {
    setLoading(true);

    const availableTickerList = await getAvailableTicker([], "", signal);
    setTickerList(Array.from(new Set(availableTickerList)));

    setLoading(false);
  }

  return (
    <TickerListContext.Provider value={{ loading, tickerList, tickerHandler }}>
      {children}
    </TickerListContext.Provider>
  );
}
