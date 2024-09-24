import { useContext } from "react";

import KLinesIntervalListContext from "@/contexts/k-lines-interval-list";

export default function useAvailableKlinesIntervalList() {
  return useContext(KLinesIntervalListContext);
}
