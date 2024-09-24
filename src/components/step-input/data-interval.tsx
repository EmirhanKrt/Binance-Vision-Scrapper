import { memo } from "react";

import { DataIntervalEnum, MarketEnum } from "@/lib/enums";

import useFormData from "@/hooks/use-form-data";

import ComboBox from "@/components/ui/combo-box";

export default memo(function DataInterval({
  disabled = true
}: {
  disabled: boolean;
}) {
  const { Market } = useFormData();

  const DataIntervalValueList = [
    { value: DataIntervalEnum.DAILY, label: "Daily" }
  ];

  if (Market !== MarketEnum.OPTION) {
    DataIntervalValueList.push({
      value: DataIntervalEnum.MONTHLY,
      label: "Monthly"
    });
  }

  return (
    <ComboBox
      label="Data Interval"
      id="DataInterval"
      name="DataInterval"
      disabled={disabled}
      valueList={DataIntervalValueList}
    />
  );
});
