"use client";

import { memo, useEffect } from "react";

import { DataEnum, KLinesIntervalEnum } from "@/lib/enums";

import useFormData from "@/hooks/use-form-data";
import useStep from "@/hooks/use-step";
import useAvailableKlinesIntervalList from "@/hooks/use-available-k-lines-interval-list";

import ComboBox from "@/components/ui/combo-box";
import { TypographyP } from "@/components/ui/typography-p";

export default memo(function KLinesInterval({
  disabled = true
}: {
  disabled: boolean;
}) {
  const { Data, Ticker } = useFormData();
  const { stepHandler } = useStep();

  const { loading, kLinesIntervalList, kLinesIntervalListHandler } =
    useAvailableKlinesIntervalList();

  const isKLineInputNeeded =
    Data === DataEnum.PREMIUM_INDEX_KLINES ||
    Data === DataEnum.KLINES ||
    Data === DataEnum.INDEX_PRICE_KLINES ||
    Data === DataEnum.MARK_PRICE_KLINES;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (isKLineInputNeeded) kLinesIntervalListHandler(signal);

    return () => {
      controller.abort("Cleaned K Lines Interval component's useEffect");
    };
  }, [isKLineInputNeeded, Ticker]);

  if (!isKLineInputNeeded) return null;

  if (loading) {
    return <TypographyP>Loading available tickers...</TypographyP>;
  }

  const enumKeys = Object.keys(KLinesIntervalEnum) as Array<
    keyof typeof KLinesIntervalEnum
  >;

  const valueToKeyMap = Object.entries(KLinesIntervalEnum).reduce(
    (acc, [key, value]) => {
      acc[value] = key as keyof typeof KLinesIntervalEnum;
      return acc;
    },
    {} as Record<string, keyof typeof KLinesIntervalEnum>
  );

  const KLinesIntervalValueList = kLinesIntervalList.map((iKLinesInterval) => {
    const key = valueToKeyMap[iKLinesInterval];

    if (!key) {
      return {
        label: iKLinesInterval,
        value: iKLinesInterval
      };
    }

    return {
      label: key,
      value: iKLinesInterval
    };
  });

  const sortedKLinesIntervalValueList = KLinesIntervalValueList.sort((a, b) => {
    const indexA = enumKeys.indexOf(a.label as keyof typeof KLinesIntervalEnum);
    const indexB = enumKeys.indexOf(b.label as keyof typeof KLinesIntervalEnum);
    return indexA - indexB;
  });

  return (
    <ComboBox
      label="K Lines Interval"
      id="KLinesInterval"
      name="KLinesInterval"
      disabled={disabled}
      valueList={sortedKLinesIntervalValueList}
    />
  );
});
