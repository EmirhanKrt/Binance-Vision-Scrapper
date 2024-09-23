"use client";

import { useState } from "react";

import { DataEnum, MarketEnum } from "@/lib/enums";
import { AVAILABLE_TICKER_LIST_CHECK_URL } from "@/lib/constants";
import { fetchDocument } from "@/lib/utils/fetch-document";

import DateRangeContext from "@/contexts/date-range";

import useFormData from "@/hooks/use-form-data";

export default function DateRangeProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const FormData = useFormData();

  const [loading, setLoading] = useState<boolean>(false);

  function filterDateRangeFromPrefix(content: string) {
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

    const isKLineInputNeeded =
      FormData.Data === DataEnum.PREMIUM_INDEX_KLINES ||
      FormData.Data === DataEnum.KLINES ||
      FormData.Data === DataEnum.INDEX_PRICE_KLINES ||
      FormData.Data === DataEnum.MARK_PRICE_KLINES;

    if (isKLineInputNeeded) searchValueParts.push(FormData.KLinesInterval);

    searchValueParts.push("");

    const fileNameSearchValueParts = [FormData.Ticker, FormData.Data, ""];

    return content
      .replace(
        searchValueParts.join("/") + fileNameSearchValueParts.join("-"),
        ""
      )
      .split(".zip")[0];
  }

  async function getAvailableDateRange(
    dateRange: Set<string> = new Set(),
    marker: string = "",
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

    const isKLineInputNeeded =
      FormData.Data === DataEnum.PREMIUM_INDEX_KLINES ||
      FormData.Data === DataEnum.KLINES ||
      FormData.Data === DataEnum.INDEX_PRICE_KLINES ||
      FormData.Data === DataEnum.MARK_PRICE_KLINES;

    if (isKLineInputNeeded) requestUrlParts.push(FormData.KLinesInterval);

    let requestUrl = requestUrlParts.join("/");
    if (marker !== "") requestUrl += `/&marker=${marker}`;

    const data = await fetchDocument(requestUrl, signal);
    if (!data) return new Set();

    const prefixes = Array.from(data.querySelectorAll("Contents > Key"))
      .map((prefix) => prefix.textContent)
      .filter(Boolean)
      .map((prefixText) => filterDateRangeFromPrefix(prefixText!));

    dateRange = new Set([...Array.from(dateRange), ...prefixes]);

    const nextMarker = data.querySelector("NextMarker");
    if (nextMarker && nextMarker.textContent) {
      return await getAvailableDateRange(
        dateRange,
        nextMarker.textContent,
        signal
      );
    }

    return new Set(prefixes);
  }

  async function dateRangeHandler(signal: AbortSignal) {
    setLoading(true);

    const availableKLinesInterval = await getAvailableDateRange(
      new Set<string>(),
      "",
      signal
    );
    const dataRangeList = Array.from(availableKLinesInterval);

    FormData.formDataHandler({
      type: "SELECT_INPUT_CHANGE",
      data: {
        field: "StartDate",
        value: new Date(dataRangeList[0]).toString()
      }
    });
    FormData.formDataHandler({
      type: "SELECT_INPUT_CHANGE",
      data: {
        field: "EndDate",
        value: new Date(dataRangeList[dataRangeList.length - 1]).toString()
      }
    });

    setLoading(false);
  }

  return (
    <DateRangeContext.Provider value={{ loading, dateRangeHandler }}>
      {children}
    </DateRangeContext.Provider>
  );
}
