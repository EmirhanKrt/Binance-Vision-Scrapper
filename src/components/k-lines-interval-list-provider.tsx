"use client";

import { useState } from "react";

import { AVAILABLE_TICKER_LIST_CHECK_URL } from "@/lib/constants";
import { fetchDocument } from "@/lib/utils/fetch-document";

import useFormData from "@/hooks/use-form-data";
import KLinesIntervalListContext from "@/contexts/k-lines-interval-list";
import { MarketEnum } from "@/lib/enums";

export default function KLinesIntrervalListProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const FormData = useFormData();

  const [kLinesIntervalList, setKLinesIntervalList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  function filterKLinesIntervalFromPrefix(content: string) {
    let searchValueParts = [
      "data",
      FormData.Market,
      FormData.DataInterval,
      FormData.Data,
      FormData.Ticker
    ];

    if (
      FormData.Market === MarketEnum.FUTURES &&
      FormData.hasOwnProperty("FuturesType")
    ) {
      searchValueParts.splice(2, 0, FormData["FuturesType"]);
    }

    return content.replace(searchValueParts.join("/"), "").split("/")[1];
  }

  async function getAvailableKLinesInterval(
    signal: AbortSignal
  ): Promise<Set<string>> {
    let requestUrlParts = [
      AVAILABLE_TICKER_LIST_CHECK_URL,
      FormData.Market,
      FormData.DataInterval,
      FormData.Data,
      FormData.Ticker
    ];

    if (
      FormData.Market === MarketEnum.FUTURES &&
      FormData.hasOwnProperty("FuturesType")
    ) {
      requestUrlParts.splice(2, 0, FormData["FuturesType"]);
    }

    let requestUrl = requestUrlParts.join("/");

    const data = await fetchDocument(requestUrl, signal);
    if (!data) return new Set();

    const prefixes = Array.from(
      data.querySelectorAll("CommonPrefixes > Prefix")
    )
      .map((prefix) => prefix.textContent)
      .filter(Boolean)
      .map((prefixText) => filterKLinesIntervalFromPrefix(prefixText!));

    return new Set(prefixes);
  }

  async function kLinesIntervalListHandler(signal: AbortSignal) {
    setLoading(true);

    const availableKLinesInterval = await getAvailableKLinesInterval(signal);
    setKLinesIntervalList(Array.from(availableKLinesInterval));

    setLoading(false);
  }

  return (
    <KLinesIntervalListContext.Provider
      value={{ loading, kLinesIntervalList, kLinesIntervalListHandler }}
    >
      {children}
    </KLinesIntervalListContext.Provider>
  );
}
