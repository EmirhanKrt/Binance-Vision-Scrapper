import { createContext } from "react";

import { DateRangeContextType } from "@/lib/types";

const initialContext = {
  loading: false,

  dateRangeHandler: () => {}
};

const DateRangeContext = createContext<DateRangeContextType>(initialContext);

export default DateRangeContext;
