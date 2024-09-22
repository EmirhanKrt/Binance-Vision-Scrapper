"use client";

import { Fragment } from "react";

import { FuturestEnum, MarketEnum } from "@/lib/enums";

import useStep from "@/hooks/use-step";
import useFormData from "@/hooks/use-form-data";

import Select from "@/components/ui/select";
import Option from "@/components/ui/option";

export default function MarketType() {
  const { step } = useStep();
  const {
    formData: { Market }
  } = useFormData();

  return (
    <Fragment>
      <Select
        label="Market Type"
        id="Market"
        name="Market"
        disabled={step !== 0}
      >
        <Option value={MarketEnum.SPOT}>Spot</Option>
        <Option value={MarketEnum.FUTURES}>Futures</Option>
        <Option value={MarketEnum.OPTION}>Options</Option>
      </Select>

      {Market === MarketEnum.FUTURES && (
        <Select
          label="Futures Type"
          id="FuturesType"
          name="FuturesType"
          disabled={step !== 0}
        >
          <Option value={FuturestEnum.COIN_M}>Coin-M</Option>
          <Option value={FuturestEnum.USD_M}>Usd-M</Option>
        </Select>
      )}
    </Fragment>
  );
}
