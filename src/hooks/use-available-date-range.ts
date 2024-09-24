import { useContext } from "react";

import DateRangeContext from "@/contexts/date-range";

export default function useAvailableDateRange() {
  return useContext(DateRangeContext);
}
