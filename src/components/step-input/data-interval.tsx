"use client";

import { memo } from "react";

import { DataIntervalEnum, MarketEnum } from "@/lib/enums";

import useFormData from "@/hooks/use-form-data";

import Select from "@/components/ui/select";
import Option from "@/components/ui/option";

export default memo(function DataInterval({
  disabled = true
}: {
  disabled: boolean;
}) {
  const { Market } = useFormData();

  return (
    <Select
      label="Data Interval"
      id="DataInterval"
      name="DataInterval"
      disabled={disabled}
    >
      <Option value={DataIntervalEnum.DAILY}>Daily</Option>

      {Market !== MarketEnum.OPTION && (
        <Option value={DataIntervalEnum.MONTHLY}>Monthly</Option>
      )}
    </Select>
  );
});
