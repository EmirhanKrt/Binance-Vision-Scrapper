"use client";

import { Fragment, memo } from "react";

import { DataEnum, DataIntervalEnum, MarketEnum } from "@/lib/enums";

import useFormData from "@/hooks/use-form-data";

import Select from "@/components/ui/select";
import Option from "@/components/ui/option";

export default memo(function Data({ disabled = true }: { disabled: boolean }) {
  const { Market, DataInterval } = useFormData();

  let content = <></>;

  switch (Market) {
    case MarketEnum.SPOT:
      content = (
        <Fragment>
          <Option value={DataEnum.AGG_TRADES}>Agg Trades</Option>
          <Option value={DataEnum.KLINES}>Klines</Option>
          <Option value={DataEnum.TRADES}>Trades</Option>
        </Fragment>
      );
      break;

    case MarketEnum.OPTION:
      content = (
        <Fragment>
          <Option value={DataEnum.BVOL_INDEX}>BVOL Index</Option>
          <Option value={DataEnum.EOH_SUMMARY}>EOH Summary</Option>
        </Fragment>
      );
      break;

    case MarketEnum.FUTURES:
      if (DataInterval === DataIntervalEnum.DAILY) {
        content = (
          <Fragment>
            <Option value={DataEnum.AGG_TRADES}>Agg Trades</Option>
            <Option value={DataEnum.BOOK_DEPTH}>Book Depth</Option>
            <Option value={DataEnum.BOOK_TICKER}>Book Ticker</Option>
            <Option value={DataEnum.INDEX_PRICE_KLINES}>
              Index Price Klines
            </Option>
            <Option value={DataEnum.KLINES}>Klines</Option>
            <Option value={DataEnum.LIQUIDATION_SNAPSHOT}>
              Liquidation Snapshot
            </Option>
            <Option value={DataEnum.MARK_PRICE_KLINES}>
              Mark Price Klines
            </Option>
            <Option value={DataEnum.METRICS}>Metrics</Option>
            <Option value={DataEnum.PREMIUM_INDEX_KLINES}>
              Premium Index Klines
            </Option>
            <Option value={DataEnum.TRADES}>Trades</Option>
          </Fragment>
        );
      } else if (DataInterval === DataIntervalEnum.MONTHLY) {
        content = (
          <Fragment>
            <Option value={DataEnum.AGG_TRADES}>Agg Trades</Option>
            <Option value={DataEnum.BOOK_DEPTH}>Book Depth</Option>
            <Option value={DataEnum.FUNDING_RATE}>Funding Rate</Option>
            <Option value={DataEnum.INDEX_PRICE_KLINES}>
              Index Price Klines
            </Option>
            <Option value={DataEnum.KLINES}>Klines</Option>
            <Option value={DataEnum.MARK_PRICE_KLINES}>
              Mark Price Klines
            </Option>
            <Option value={DataEnum.PREMIUM_INDEX_KLINES}>
              Premium Index Klines
            </Option>
            <Option value={DataEnum.TRADES}>Trades</Option>
          </Fragment>
        );
      }

      break;

    default:
      break;
  }

  return (
    <Select label="Data" id="Data" name="Data" disabled={disabled}>
      {content}
    </Select>
  );
});
