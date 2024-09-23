"use client";

import { memo, useEffect } from "react";

import DateRangePicker from "@/components/ui/date-range-picker";
import useAvailableDateRange from "@/hooks/use-available-date-range";
import { TypographyP } from "../ui/typography-p";

export default memo(function StartDateAndEndDate({
  disabled = true
}: {
  disabled: boolean;
}) {
  const { loading, dateRangeHandler } = useAvailableDateRange();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dateRangeHandler(signal);

    return () => {
      controller.abort("Cleaned Date component's useEffect");
    };
  }, []);

  if (loading) {
    return <TypographyP>Loading date range...</TypographyP>;
  }

  return (
    <DateRangePicker
      startDate={{ id: "StartDate", name: "StartDate" }}
      endDate={{ id: "EndDate", name: "EndDate" }}
      label="Date"
      disabled={disabled}
    />
  );
});
