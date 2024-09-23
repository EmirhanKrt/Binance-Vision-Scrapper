import FormDataProvider from "@/components/form-data-provider";
import StepProvider from "@/components/step-provider";

import FormContainer from "@/components/form-container";
import StepperButtonGroup from "@/components/stepper-button-group";
import TickerListProvider from "@/components/ticker-list-provider";
import KLinesIntrervalListProvider from "@/components/k-lines-interval-list-provider";
import DateRangeProvider from "@/components/date-range-provider";

export default function MainContainer() {
  return (
    <main className="max-w-80 w-full m-auto flex-1 flex flex-col gap-4">
      <FormDataProvider>
        <StepProvider>
          <TickerListProvider>
            <KLinesIntrervalListProvider>
              <DateRangeProvider>
                <FormContainer />
                <StepperButtonGroup />
              </DateRangeProvider>
            </KLinesIntrervalListProvider>
          </TickerListProvider>
        </StepProvider>
      </FormDataProvider>
    </main>
  );
}
