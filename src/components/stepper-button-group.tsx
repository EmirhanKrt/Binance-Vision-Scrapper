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
    <div className="flex justify-between">
      <Button
        variant={"secondary"}
        onClick={() => stepHandler("previous")}
        disabled={step === 0 || step === 6 || isLoading}
        className={"disabled:cursor-not-allowed"}
      >
        Previous
      </Button>
      <Button
        onClick={() => stepHandler("next")}
        disabled={step === 6 || isLoading}
      >
        {step === 5 ? "Start Scrapping" : step === 6 ? "Scrapping..." : "Next"}
      </Button>
    </div>
  );
}
