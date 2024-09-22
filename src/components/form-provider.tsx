"use client";

import { useReducer, useState } from "react";

import FormContext from "@/contexts/form";

import { TestCaseFormData } from "@/lib/test-cases";
import {
  DownloadHistoricalDataFormData,
  FormDataReducerActionType
} from "@/lib/types";

function reducer(
  state: DownloadHistoricalDataFormData,
  action: FormDataReducerActionType
) {
  switch (action.type) {
    case "SELECT_INPUT_CHANGE":
      return {
        ...state,
        [action.data.field]: action.data.value
      };

    default:
      break;
  }

  return state;
}

function FormProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(0);
  const [formData, dispatch] = useReducer(reducer, TestCaseFormData[0]);

  function stepHandler(direction: string) {
    switch (direction) {
      case "next":
        if (step < 5) setStep(step + 1);
        break;

      case "previous":
        if (step > 0) setStep(step - 1);
        break;
    }

    return;
  }

  function formDataHandler(event: FormDataReducerActionType) {
    dispatch(event);
    return;
  }

  return (
    <FormContext.Provider
      value={{ step, stepHandler, formData, formDataHandler }}
    >
      {children}
    </FormContext.Provider>
  );
}

export default FormProvider;
