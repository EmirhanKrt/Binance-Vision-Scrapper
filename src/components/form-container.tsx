"use client";

import useStep from "@/hooks/use-step";

import MarketType from "@/components/step-input/market-type";
import DataInterval from "@/components/step-input/data-interval";
import Data from "@/components/step-input/data";
import Ticker from "@/components/step-input/ticker";
import KLinesInterval from "@/components/step-input/k-lines-interval";
import StartDateAndEndDate from "@/components/step-input/start-date-and-end-date";
import StepperButtonGroup from "@/components/stepper-button-group";
import { downloadHistoricalData } from "@/actions/download-historical-data";

export default function FormContainer() {
  const { step } = useStep();

  return (
    <form
      className="flex flex-col gap-4 flex-1"
      action={downloadHistoricalData}
    >
      <button type="submit">submit</button>
      <MarketType disabled={step !== 0} />
      {step > 0 && <DataInterval disabled={step !== 1} />}
      {step > 1 && <Data disabled={step !== 2} />}
      {step > 2 && <Ticker disabled={step !== 3} />}
      {step > 3 && <KLinesInterval disabled={step !== 4} />}
      {step > 4 && <StartDateAndEndDate disabled={step !== 5} />}

      <StepperButtonGroup />
    </form>
  );
}
