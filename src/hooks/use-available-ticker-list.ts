import { useContext } from "react";

import TickerListContext from "@/contexts/ticker-list";

export default function useAvailableTickerList() {
  return useContext(TickerListContext);
}
