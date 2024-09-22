"use client";

import useStep from "@/hooks/use-step";
import { Button } from "@/components/ui/button";

export default function StepperButtonGroup() {
  const { step, stepHandler } = useStep();

  return (
    <div className="flex justify-between mt-auto">
      <Button
        variant={"secondary"}
        onClick={() => stepHandler("previous")}
        disabled={step === 0}
        className={"disabled:cursor-not-allowed"}
      >
        Previous
      </Button>
      <Button onClick={() => stepHandler("next")}>
        {step === 5 ? "Start Fetching" : "Next"}
      </Button>
    </div>
  );
}
