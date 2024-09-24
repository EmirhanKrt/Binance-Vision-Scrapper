"use client";

import { useMemo, useState } from "react";

import { DataEnum, MarketEnum } from "@/lib/enums";
import { AVAILABLE_TICKER_LIST_CHECK_URL } from "@/lib/constants";
import { fetchDocument, generateRequestUrl } from "@/lib/utils/fetch-document";

import DateRangeContext from "@/contexts/date-range";

import useFormData from "@/hooks/use-form-data";

export default function DateRangeProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const FormData = useFormData();

  const [loading, setLoading] = useState<boolean>(false);

  const requestUrl = useMemo(() => {
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

    return requestUrlParts.join("/");
  }, [FormData]);

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

    const fileNameSearchValueParts = [FormData.Ticker];

    if (isKLineInputNeeded)
      fileNameSearchValueParts.push(FormData.KLinesInterval);
    else fileNameSearchValueParts.push(FormData.Data);

    fileNameSearchValueParts.push("");

    return content
      .replace(
        searchValueParts.join("/") + fileNameSearchValueParts.join("-"),
        ""
      )
      .split(".zip")[0];
  }

  async function getAvailableDateRange(
    dateRange: string[] = [],
    marker: string = "",
    signal: AbortSignal
  ): Promise<string[]> {
    const data = await fetchDocument(
      generateRequestUrl(requestUrl, marker),
      signal
    );
    if (!data) return dateRange;

    const prefixes = Array.from(data.querySelectorAll("Contents > Key"))
      .map((prefix) => prefix.textContent)
      .filter(Boolean)
      .map((prefixText) => filterDateRangeFromPrefix(prefixText!));

    dateRange = [...dateRange, ...prefixes];

    const nextMarker = data.querySelector("NextMarker");
    if (nextMarker && nextMarker.textContent) {
      return await getAvailableDateRange(
        dateRange,
        nextMarker.textContent,
        signal
      );
    }

    return dateRange;
  }

  async function dateRangeHandler(signal: AbortSignal) {
    setLoading(true);

    const availableKLinesInterval = await getAvailableDateRange([], "", signal);

    FormData.formDataHandler({
      type: "SELECT_INPUT_CHANGE",
      data: {
        field: "StartDate",
        value: new Date(availableKLinesInterval[0]).toString()
      }
    });
    FormData.formDataHandler({
      type: "SELECT_INPUT_CHANGE",
      data: {
        field: "EndDate",
        value: new Date(
          availableKLinesInterval[availableKLinesInterval.length - 1]
        ).toString()
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
