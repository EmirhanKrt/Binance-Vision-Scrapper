import { createContext } from "react";

import { FormDataContextType } from "@/lib/types";
import { TestCaseFormData } from "@/lib/test-cases";

const initialContext = {
  formData: TestCaseFormData[0],
  formDataHandler: () => {}
};

const FormDataContext = createContext<FormDataContextType>(initialContext);

export default FormDataContext;
