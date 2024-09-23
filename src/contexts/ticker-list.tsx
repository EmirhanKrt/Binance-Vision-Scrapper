import { createContext } from "react";

import { TickerListContextType } from "@/lib/types";

const initialContext = {
  loading: false,

  tickerList: [],
  tickerHandler: () => {}
};

const TickerListContext = createContext<TickerListContextType>(initialContext);

export default TickerListContext;
