import MarketType from "@/components/step-input/market-type";
import DataInterval from "@/components/step-input/data-interval";
import Data from "@/components/step-input/data";

export default function FormContainer() {
  return (
    <form className="flex flex-col gap-4">
      <MarketType />
      <DataInterval />
      <Data />
    </form>
  );
}
