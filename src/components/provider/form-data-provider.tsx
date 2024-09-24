"use client";

import { useReducer } from "react";

import FormDataContext from "@/contexts/form-data";

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
      return state;
  }
}

export default function FormDataProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [formData, dispatch] = useReducer(
    reducer,
    {} as DownloadHistoricalDataFormData
  );

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
