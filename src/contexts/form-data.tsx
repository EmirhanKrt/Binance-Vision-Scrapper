import { createContext } from "react";

import {
  DownloadHistoricalDataFormData,
  FormDataContextType
} from "@/lib/types";

const initialContext = {
  formData: {} as DownloadHistoricalDataFormData,
  formDataHandler: () => {}
};

const FormDataContext = createContext<FormDataContextType>(initialContext);

export default FormDataContext;
