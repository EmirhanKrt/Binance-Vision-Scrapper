"use client";

import useStep from "@/hooks/use-step";
import useAvailableTickerList from "@/hooks/use-available-ticker-list";

import { Button } from "@/components/ui/button";
import useAvailableKlinesIntervalList from "@/hooks/use-available-k-lines-interval-list";
import useAvailableDateRange from "@/hooks/use-available-date-range";

export default function StepperButtonGroup() {
  const { step, stepHandler } = useStep();

  const { loading: isTickerListLoading } = useAvailableTickerList();
  const { loading: isKlinesIntervalListLoading } =
    useAvailableKlinesIntervalList();
  const { loading: isDateRangeLoading } = useAvailableDateRange();

  const isLoading =
    isTickerListLoading || isKlinesIntervalListLoading || isDateRangeLoading;

  return (
    <div className="flex justify-between">
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
          Start Scrapping
        </Button>
      ) : (
        <Button
          onClick={() => stepHandler("next")}
          disabled={isLoading}
          type="button"
        >
          Next
        </Button>
      )}
    </div>
  );
}
