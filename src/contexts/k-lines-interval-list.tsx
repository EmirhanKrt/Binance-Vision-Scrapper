import { createContext } from "react";

import { KLinesIntervalListContextType } from "@/lib/types";

const initialContext = {
  loading: false,

  kLinesIntervalList: [],
  kLinesIntervalListHandler: () => {}
};

const KLinesIntervalListContext =
  createContext<KLinesIntervalListContextType>(initialContext);

export default KLinesIntervalListContext;
