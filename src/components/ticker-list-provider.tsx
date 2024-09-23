"use client";

import { useState } from "react";

import { AVAILABLE_TICKER_LIST_CHECK_URL } from "@/lib/constants";
import { fetchDocument } from "@/lib/utils/fetch-document";

import TickerListContext from "@/contexts/ticker-list";

import useFormData from "@/hooks/use-form-data";

export default function TickerListProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { Market, DataInterval, Data } = useFormData();

  const [tickerList, setTickerList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  function filterTickerFromPrefix(content: string) {
    return content
      .replace(["data", Market, DataInterval, Data].join("/"), "")
      .split("/")[1];
  }

  async function getAvailableTicker(
    tickerList: Set<string> = new Set(),
    marker: string = "",
    signal: AbortSignal
  ) {
    let requestUrl = [
      AVAILABLE_TICKER_LIST_CHECK_URL,
      Market,
      DataInterval,
      Data
    ].join("/");

    if (marker !== "")
      requestUrl += `/&marker=${[
        "data",
        Market,
        DataInterval,
        Data,
        marker
      ].join("/")}`;

    const data = await fetchDocument(requestUrl, signal);
    if (!data) return tickerList;

    const prefixes = Array.from(
      data.querySelectorAll("CommonPrefixes > Prefix")
    )
      .map((prefix) => prefix.textContent)
      .filter(Boolean)
      .map((prefixText) => filterTickerFromPrefix(prefixText!));

    tickerList = new Set([...Array.from(tickerList), ...prefixes]);

    const nextMarker = data.querySelector("NextMarker");
    if (nextMarker && nextMarker.textContent) {
      return await getAvailableTicker(
        tickerList,
        filterTickerFromPrefix(nextMarker.textContent),
        signal
      );
    }

    return tickerList;
  }

  async function tickerHandler(signal: AbortSignal) {
    setLoading(true);

    const availableTickerList = await getAvailableTicker(
      new Set<string>(),
      "",
      signal
    );
    setTickerList(Array.from(availableTickerList));

    setLoading(false);
  }

  return (
    <TickerListContext.Provider value={{ loading, tickerList, tickerHandler }}>
      {children}
    </TickerListContext.Provider>
  );
}
