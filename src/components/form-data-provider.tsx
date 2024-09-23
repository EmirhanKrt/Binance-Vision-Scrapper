"use client";

import { useReducer } from "react";

import FormDataContext from "@/contexts/form-data";

import { TestCaseFormData } from "@/lib/test-cases";
import {
  DownloadHistoricalDataFormData,
  FormDataReducerActionType
} from "@/lib/types";
import { DataIntervalEnum, FuturestEnum, MarketEnum } from "@/lib/enums";

function reducer(
  state: DownloadHistoricalDataFormData,
  action: FormDataReducerActionType
) {
  // todo: there are select bugs
  switch (action.type) {
    case "SELECT_INPUT_CHANGE":
      if (action.data.field === "Market") {
        // Setting initial DataInterval value when user selects the Option as Market Type
        if (action.data.value === MarketEnum.OPTION) {
          return {
            ...state,
            DataInterval: DataIntervalEnum.DAILY,
            [action.data.field]: action.data.value
          } as DownloadHistoricalDataFormData;
        }

        // Setting initial FuturesType value when user selects the Futures as Market Type
        if (action.data.value === MarketEnum.FUTURES) {
          return {
            ...state,
            FuturesType: FuturestEnum.COIN_M,
            [action.data.field]: action.data.value
          } as DownloadHistoricalDataFormData;
        }

        // Removing FuturesType when user not selects the Futures as Market Type
        if (state.Market === MarketEnum.FUTURES) {
          const { FuturesType, ...newState } = state;
          return {
            ...newState,
            [action.data.field]: action.data.value
          } as DownloadHistoricalDataFormData;
        }
      }

      return {
        ...state,
        [action.data.field]: action.data.value
      };

    default:
      break;
  }

  return state;
}

export default function FormDataProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [formData, dispatch] = useReducer(reducer, TestCaseFormData[0]);

  function formDataHandler(event: FormDataReducerActionType) {
    dispatch(event);
    return;
  }

  return (
    <FormDataContext.Provider value={{ formData, formDataHandler }}>
      {children}
    </FormDataContext.Provider>
  );
}
