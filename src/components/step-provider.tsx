"use client";

import { useCallback, useState } from "react";

import StepContext from "@/contexts/step";

export default function StepProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [step, setStep] = useState(0);

  const stepHandler = (direction: "next" | "previous") => {
    switch (direction) {
      case "next":
        if (step < 6) setStep(step + 1);
        break;

      case "previous":
        if (step > 0) setStep(step - 1);
        break;
    }

    return;
  };

  return (
    <StepContext.Provider value={{ step, stepHandler }}>
      {children}
    </StepContext.Provider>
  );
}
