"use client";

import { useFormStatus } from "react-dom";

import useStep from "@/hooks/use-step";
import useAvailableTickerList from "@/hooks/use-available-ticker-list";

import { Button } from "@/components/ui/button";
import useAvailableKlinesIntervalList from "@/hooks/use-available-k-lines-interval-list";
import useAvailableDateRange from "@/hooks/use-available-date-range";

export default function StepperButtonGroup() {
  const { step, stepHandler } = useStep();

  const { pending } = useFormStatus();

  const { loading: isTickerListLoading } = useAvailableTickerList();
  const { loading: isKlinesIntervalListLoading } =
    useAvailableKlinesIntervalList();
  const { loading: isDateRangeLoading } = useAvailableDateRange();

  const isLoading =
    isTickerListLoading ||
    isKlinesIntervalListLoading ||
    isDateRangeLoading ||
    pending;

  return (
    <div className="flex justify-between mt-auto">
      <Button
        variant={"secondary"}
        onClick={() => stepHandler("previous")}
        disabled={step === 0 || isLoading}
        className={"disabled:cursor-not-allowed"}
        type="button"
      >
        Previous
      </Button>
      {step === 5 ? (
        <Button type={"submit"} disabled={isLoading}>
          {pending ? "Scrapping..." : "Start Scrapping"}
        </Button>
      ) : (
        <Button
          onClick={() => stepHandler("next")}
          disabled={isLoading}
          className={"disabled:cursor-not-allowed"}
          type="button"
        >
          Next
        </Button>
      )}
    </div>
  );
}
