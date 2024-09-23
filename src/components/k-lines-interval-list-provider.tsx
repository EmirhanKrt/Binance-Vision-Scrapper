"use client";

import { useState } from "react";

import { AVAILABLE_TICKER_LIST_CHECK_URL } from "@/lib/constants";
import { fetchDocument } from "@/lib/utils/fetch-document";

import useFormData from "@/hooks/use-form-data";
import KLinesIntervalListContext from "@/contexts/k-lines-interval-list";

export default function KLinesIntrervalListProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { Market, DataInterval, Data, Ticker } = useFormData();

  const [kLinesIntervalList, setKLinesIntervalList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  function filterKLinesIntervalFromPrefix(content: string) {
    return content
      .replace(["data", Market, DataInterval, Data, Ticker].join("/"), "")
      .split("/")[1];
  }

  async function getAvailableKLinesInterval(
    signal: AbortSignal
  ): Promise<Set<string>> {
    let requestUrl = [
      AVAILABLE_TICKER_LIST_CHECK_URL,
      Market,
      DataInterval,
      Data,
      Ticker
    ].join("/");

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
