import FormDataProvider from "@/components/form-data-provider";
import StepProvider from "@/components/step-provider";

import FormContainer from "@/components/form-container";
import StepperButtonGroup from "@/components/stepper-button-group";

export default function MainContainer() {
  return (
    <main className="max-w-80 w-full m-auto flex-1 flex flex-col">
      <FormDataProvider>
        <StepProvider>
          <FormContainer />
          <StepperButtonGroup />
        </StepProvider>
      </FormDataProvider>
    </main>
  );
}
