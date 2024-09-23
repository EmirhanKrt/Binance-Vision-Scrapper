"use client";

import { Fragment, memo } from "react";

import { FuturestEnum, MarketEnum } from "@/lib/enums";

import useFormData from "@/hooks/use-form-data";

import Select from "@/components/ui/select";
import Option from "@/components/ui/option";

export default memo(function MarketType({
  disabled = true
}: {
  disabled: boolean;
}) {
  const { Market } = useFormData();

  return (
    <Fragment>
      <Select label="Market Type" id="Market" name="Market" disabled={disabled}>
        <Option value={MarketEnum.SPOT}>Spot</Option>
        <Option value={MarketEnum.FUTURES}>Futures</Option>
        <Option value={MarketEnum.OPTION}>Options</Option>
      </Select>

      {Market === MarketEnum.FUTURES && (
        <Select
          label="Futures Type"
          id="FuturesType"
          name="FuturesType"
          disabled={disabled}
        >
          <Option value={FuturestEnum.COIN_M}>Coin-M</Option>
          <Option value={FuturestEnum.USD_M}>Usd-M</Option>
        </Select>
      )}
    </Fragment>
  );
});
