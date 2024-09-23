"use client";

import { memo } from "react";

import { DataEnum, DataIntervalEnum, MarketEnum } from "@/lib/enums";

import useFormData from "@/hooks/use-form-data";

import ComboBox from "@/components/ui/combo-box";

export default memo(function Data({ disabled = true }: { disabled: boolean }) {
  const { Market, DataInterval } = useFormData();

  const DataValueList = [];

  switch (Market) {
    case MarketEnum.SPOT:
      DataValueList.push(
        ...[
          { value: DataEnum.AGG_TRADES, label: "Agg Trades" },
          { value: DataEnum.KLINES, label: "Klines" },
          { value: DataEnum.TRADES, label: "Trades" }
        ]
      );
      break;

    case MarketEnum.OPTION:
      DataValueList.push(
        ...[
          { value: DataEnum.BVOL_INDEX, label: "BVOL Index" },
          { value: DataEnum.EOH_SUMMARY, label: "EOH Summary" }
        ]
      );

      break;

    case MarketEnum.FUTURES:
      if (DataInterval === DataIntervalEnum.DAILY) {
        DataValueList.push(
          ...[
            { value: DataEnum.AGG_TRADES, label: "Agg Trades" },
            { value: DataEnum.BOOK_DEPTH, label: "Book Depth" },
            { value: DataEnum.BOOK_TICKER, label: "Book Ticker" },
            { value: DataEnum.INDEX_PRICE_KLINES, label: "Index Price Klines" },
            { value: DataEnum.KLINES, label: "Klines" },
            {
              value: DataEnum.LIQUIDATION_SNAPSHOT,
              label: "Liquidation Snapshot"
            },
            { value: DataEnum.MARK_PRICE_KLINES, label: "Mark Price Klines" },
            { value: DataEnum.METRICS, label: "Metrics" },
            {
              value: DataEnum.PREMIUM_INDEX_KLINES,
              label: "Premium Index Klines"
            },
            { value: DataEnum.TRADES, label: "Trades" }
          ]
        );
      } else if (DataInterval === DataIntervalEnum.MONTHLY) {
        DataValueList.push(
          ...[
            { value: DataEnum.AGG_TRADES, label: "Agg Trades" },
            { value: DataEnum.BOOK_DEPTH, label: "Book Depth" },
            { value: DataEnum.FUNDING_RATE, label: "Funding Rate" },
            { value: DataEnum.INDEX_PRICE_KLINES, label: "Index Price Klines" },
            { value: DataEnum.KLINES, label: "Klines" },
            { value: DataEnum.MARK_PRICE_KLINES, label: "Mark Price Klines" },
            {
              value: DataEnum.PREMIUM_INDEX_KLINES,
              label: "Premium Index Klines"
            },
            { value: DataEnum.TRADES, label: "Trades" }
          ]
        );
      }

      break;

    default:
      break;
  }

  return (
    <ComboBox
      label="Data"
      id="Data"
      name="Data"
      disabled={disabled}
      valueList={DataValueList}
    />
  );
});
