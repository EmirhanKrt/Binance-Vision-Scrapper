import { useContext } from "react";

import StepContext from "@/contexts/step";

function useStep() {
  return useContext(StepContext);
}

export default useStep;
