import FormProvider from "@/components/form-provider";
import FormContainer from "@/components/form-container";
import StepperButtonGroup from "@/components/stepper-button-group";

export default function MainContainer() {
  return (
    <main className="max-w-80 w-full m-auto flex-1 flex flex-col">
      <FormProvider>
        <FormContainer />
        <StepperButtonGroup />
      </FormProvider>
    </main>
  );
}
