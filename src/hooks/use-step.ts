import { useContext } from "react";

import StepContext from "@/contexts/step";

export default function useStep() {
  return useContext(StepContext);
}
