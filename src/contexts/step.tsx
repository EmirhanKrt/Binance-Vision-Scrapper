import { createContext } from "react";

import { StepContextType } from "@/lib/types";

const initialContext = {
  step: 0,
  stepHandler: () => {}
};

const StepContext = createContext<StepContextType>(initialContext);

export default StepContext;
