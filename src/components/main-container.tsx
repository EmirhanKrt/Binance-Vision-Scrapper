import FormDataProvider from "@/components/form-data-provider";
import StepProvider from "@/components/step-provider";

import FormContainer from "@/components/form-container";
import StepperButtonGroup from "@/components/stepper-button-group";
import TickerListProvider from "./ticker-list-provider";
import KLinesIntrervalListProvider from "./k-lines-interval-list-provider";

export default function MainContainer() {
  return (
    <main className="max-w-80 w-full m-auto flex-1 flex flex-col">
      <FormDataProvider>
        <StepProvider>
          <TickerListProvider>
            <KLinesIntrervalListProvider>
              <FormContainer />
              <StepperButtonGroup />
            </KLinesIntrervalListProvider>
          </TickerListProvider>
        </StepProvider>
      </FormDataProvider>
    </main>
  );
}
