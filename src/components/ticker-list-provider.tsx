"use client";

import { useState } from "react";

import { AVAILABLE_TICKER_LIST_CHECK_URL } from "@/lib/constants";
import { MarketEnum } from "@/lib/enums";
import { fetchDocument } from "@/lib/utils/fetch-document";

import TickerListContext from "@/contexts/ticker-list";

import useFormData from "@/hooks/use-form-data";

export default function TickerListProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const FormData = useFormData();

  const [tickerList, setTickerList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  function filterTickerFromPrefix(content: string) {
    let searchValueParts = [
      "data",
      FormData.Market,
      FormData.DataInterval,
      FormData.Data
    ];

    if (
      FormData.Market === MarketEnum.FUTURES &&
      FormData.hasOwnProperty("FuturesType")
    ) {
      searchValueParts.splice(2, 0, FormData["FuturesType"]);
    }

    return content.replace(searchValueParts.join("/"), "").split("/")[1];
  }

  async function getAvailableTicker(
    tickerList: Set<string> = new Set(),
    marker: string = "",
    signal: AbortSignal
  ) {
    let requestUrlParts = [
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

    let requestUrl = requestUrlParts.join("/");
    if (marker !== "")
      requestUrl += `/&marker=${[
        "data",
        FormData.Market,
        FormData.DataInterval,
        FormData.Data,
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
