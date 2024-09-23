import { useCallback, useEffect, useState } from "react";

import useFormData from "@/hooks/use-form-data";
import { AVAILABLE_TICKER_LIST_CHECK_URL } from "@/lib/constants";

function parseXml(text: string) {
  return new DOMParser().parseFromString(text, "application/xml");
}

async function fetchTicker(
  url: string,
  signal: AbortSignal
): Promise<Document | null> {
  const response = await fetch(url + "/", { signal });
  if (!response.ok) {
    console.log(`HTTP error! status: ${response.status}`);
    return null;
  }

  const responseAsText = await response.text();
  return parseXml(responseAsText);
}

export default function useAvailableTickers() {
  const { Market, DataInterval, Data } = useFormData();

  const [tickers, setTickers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const filterTickerFromPrefix = useCallback(
    (content: string) => {
      return content
        .replace(["data", Market, DataInterval, Data].join("/"), "")
        .split("/")[1];
    },
    [Market, DataInterval, Data]
  );

  const getAvailableTicker = useCallback(
    async (
      tickerList: Set<string> = new Set(),
      marker: string = "",
      signal: AbortSignal
    ): Promise<Set<string>> => {
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

      const data = await fetchTicker(requestUrl, signal);
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
    },
    [Market, DataInterval, Data]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let isMounted = true;

    const fetchTickers = async () => {
      setLoading(true);

      const availableTickers = await getAvailableTicker(
        new Set<string>(),
        "",
        signal
      );
      if (isMounted) {
        setTickers(Array.from(availableTickers));
        setLoading(false);
      }
    };

    fetchTickers();

    return () => {
      isMounted = false;
      controller.abort("Cleanup function called on use-available-tickers");
      setTickers([]);
      setLoading(false);
    };
  }, [Market, DataInterval, Data]);

  return { tickers, loading };
}
