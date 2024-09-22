import { useContext } from "react";

import FormContext from "@/contexts/form";

function useFormData() {
  const { formData, formDataHandler } = useContext(FormContext);

  return { formData, formDataHandler };
}

export default useFormData;
