"use client";

import { useCallback, useState } from "react";

import StepContext from "@/contexts/step";

export default function StepProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [step, setStep] = useState(0);

  const stepHandler = useCallback(
    function (direction: "next" | "previous") {
      switch (direction) {
        case "next":
          if (step < 5) setStep(step + 1);
          break;

        case "previous":
          if (step > 0) setStep(step - 1);
          break;
      }

      return;
    },
    [step]
  );

  return (
    <StepContext.Provider value={{ step, stepHandler }}>
      {children}
    </StepContext.Provider>
  );
}
