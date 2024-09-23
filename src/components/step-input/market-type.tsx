"use client";

import { Fragment, memo } from "react";

import { FuturestEnum, MarketEnum } from "@/lib/enums";

import useFormData from "@/hooks/use-form-data";

import ComboBox from "@/components/ui/combo-box";

const MarketValueList = [
  { value: MarketEnum.SPOT, label: "Spot" },
  { value: MarketEnum.FUTURES, label: "Futures" },
  { value: MarketEnum.OPTION, label: "Option" }
];

const FuturesTypeValueList = [
  { value: FuturestEnum.COIN_M, label: "Coin-M" },
  { value: FuturestEnum.USD_M, label: "Usd-M" }
];

export default memo(function MarketType({
  disabled = true
}: {
  disabled: boolean;
}) {
  const { Market } = useFormData();

  return (
    <Fragment>
      <ComboBox
        label="Market Type"
        id="Market"
        name="Market"
        disabled={disabled}
        valueList={MarketValueList}
      />

      {Market === MarketEnum.FUTURES && (
        <ComboBox
          label="Futures Type"
          id="FuturesType"
          name="FuturesType"
          disabled={disabled}
          valueList={FuturesTypeValueList}
        />
      )}
    </Fragment>
  );
});
