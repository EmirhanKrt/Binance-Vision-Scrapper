import FormDataProvider from "@/components/provider/form-data-provider";
import StepProvider from "@/components/provider/step-provider";

import FormContainer from "@/components/form-container";
import TickerListProvider from "@/components/provider/ticker-list-provider";
import KLinesIntrervalListProvider from "@/components/provider/k-lines-interval-list-provider";
import DateRangeProvider from "@/components/provider/date-range-provider";

export default function MainContainer() {
  return (
    <main className="max-w-80 w-full m-auto flex-1 flex flex-col gap-4">
      <FormDataProvider>
        <StepProvider>
          <TickerListProvider>
            <KLinesIntrervalListProvider>
              <DateRangeProvider>
                <FormContainer />
              </DateRangeProvider>
            </KLinesIntrervalListProvider>
          </TickerListProvider>
        </StepProvider>
      </FormDataProvider>
    </main>
  );
}
