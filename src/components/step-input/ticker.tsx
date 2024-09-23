"use client";

import { useEffect, useMemo, useState } from "react";

import { DataEnum, DataIntervalEnum, MarketEnum } from "@/lib/enums";
import { AVAILABLE_TICKER_LIST_CHECK_URL } from "@/lib/constants";

import useFormData from "@/hooks/use-form-data";

import Select from "@/components/ui/select";
import Option from "@/components/ui/option";

export default function Ticker({ disabled = true }: { disabled: boolean }) {
  const { Market, DataInterval, Data } = useFormData();

  return (
    <Select label="Ticker" id="Ticker" name="Ticker" disabled={disabled}>
      asd
    </Select>
  );
}
