import { useContext } from "react";

import FormContext from "@/contexts/form";

function useStep() {
  const { step, stepHandler } = useContext(FormContext);

  return { step, stepHandler };
}

export default useStep;
