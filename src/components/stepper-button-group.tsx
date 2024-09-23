"use client";

import useStep from "@/hooks/use-step";
import useAvailableTickerList from "@/hooks/use-available-ticker-list";

import { Button } from "@/components/ui/button";
import useAvailableKlinesIntervalList from "@/hooks/use-available-k-lines-interval-list";

export default function StepperButtonGroup() {
  const { step, stepHandler } = useStep();

  const { loading: isTickerListLoading } = useAvailableTickerList();
  const { loading: isKlinesIntervalListLoading } =
    useAvailableKlinesIntervalList();

  const isLoading = isTickerListLoading || isKlinesIntervalListLoading;

  return (
    <div className="flex justify-between mt-auto">
      <Button
        variant={"secondary"}
        onClick={() => stepHandler("previous")}
        disabled={step === 0 || isLoading}
        className={"disabled:cursor-not-allowed"}
      >
        Previous
      </Button>
      <Button onClick={() => stepHandler("next")} disabled={isLoading}>
        {step === 5 ? "Start Fetching" : "Next"}
      </Button>
    </div>
  );
}
