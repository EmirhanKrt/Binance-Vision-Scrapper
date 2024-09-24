"use client";

import { useEffect, useReducer } from "react";

import { downloadHistoricalData } from "@/actions/download-historical-data";

import useStep from "@/hooks/use-step";

import MarketType from "@/components/step-input/market-type";
import DataInterval from "@/components/step-input/data-interval";
import Data from "@/components/step-input/data";
import Ticker from "@/components/step-input/ticker";
import KLinesInterval from "@/components/step-input/k-lines-interval";
import StartDateAndEndDate from "@/components/step-input/start-date-and-end-date";
import StepperButtonGroup from "@/components/stepper-button-group";
import { TypographyP } from "@/components/ui/typography-p";

function reducer(
  state: {
    success: boolean;
    errorMessage: string;
  },
  action: {
    type: string;
    payload?: {
      success: boolean;
      errorMessage: string;
    };
  }
) {
  switch (action.type) {
    case "RESET":
      return { success: false, errorMessage: "" };

    case "SET":
      return { ...state, ...action?.payload };

    default:
      return state;
  }
}

export default function FormContainer() {
  const [state, dispatch] = useReducer(reducer, {
    success: false,
    errorMessage: ""
  });

  const { step } = useStep();

  useEffect(() => {
    if (step < 5) {
      return dispatch({
        type: "RESET"
      });
    }
  }, [step]);

  return (
    <form
      className="flex flex-col gap-4 flex-1"
      action={async (formData) => {
        const result = await downloadHistoricalData(formData);
        return dispatch({
          type: "SET",
          payload: result
        });
      }}
    >
      <MarketType disabled={step !== 0} />
      {step > 0 && <DataInterval disabled={step !== 1} />}
      {step > 1 && <Data disabled={step !== 2} />}
      {step > 2 && <Ticker disabled={step !== 3} />}
      {step > 3 && <KLinesInterval disabled={step !== 4} />}
      {step > 4 && <StartDateAndEndDate disabled={step !== 5} />}

      {state.success ? (
        <TypographyP className="bg-green-600 p-4 text-black font-bold border rounded-md">
          Extracted all files and generated merged csv file. Check your output
          folder
        </TypographyP>
      ) : state.errorMessage !== "" ? (
        <TypographyP className="bg-destructive p-4 text-destructive-foreground font-bold border rounded-md">
          Error occured ({state.errorMessage}) when extracting file.
        </TypographyP>
      ) : null}

      <StepperButtonGroup />
    </form>
  );
}
