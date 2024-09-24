import { useContext } from "react";

import FormDataContext from "@/contexts/form-data";

function useFormData() {
  const { formData, formDataHandler } = useContext(FormDataContext);

  return { ...formData, formDataHandler };
}

export default useFormData;
