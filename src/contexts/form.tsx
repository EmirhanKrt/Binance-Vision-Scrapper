import { createContext } from "react";

import { FormContextType } from "@/lib/types";
import { TestCaseFormData } from "@/lib/test-cases";

const initialContext = {
  step: 0,
  stepHandler: () => {},

  formData: TestCaseFormData[0],
  formDataHandler: () => {}
};

const FormContext = createContext<FormContextType>(initialContext);

export default FormContext;
