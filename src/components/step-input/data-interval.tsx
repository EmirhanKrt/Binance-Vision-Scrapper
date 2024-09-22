"use client";

import { DataIntervalEnum, MarketEnum } from "@/lib/enums";

import useStep from "@/hooks/use-step";
import useFormData from "@/hooks/use-form-data";

import Select from "@/components/ui/select";
import Option from "@/components/ui/option";

export default function DataInterval() {
  const { step } = useStep();
  const {
    formData: { Market }
  } = useFormData();

  if (step >= 1)
    return (
      <Select
        label="Data Interval"
        id="DataInterval"
        name="DataInterval"
        disabled={step !== 1}
      >
        <Option value={DataIntervalEnum.DAILY}>Daily</Option>

        {Market !== MarketEnum.OPTION && (
          <Option value={DataIntervalEnum.MONTHLY}>Monthly</Option>
        )}
      </Select>
    );

  return null;
}
