import {
  DataEnum,
  DataIntervalEnum,
  FuturestEnum,
  KLinesIntervalEnum,
  MarketEnum
} from "@/lib/enums";

type SpotMarketConfigType = {
  Market: MarketEnum.SPOT;
} & (
  | {
      Data: DataEnum.AGG_TRADES | DataEnum.TRADES;
      DataInterval: DataIntervalEnum;
    }
  | {
      Data: DataEnum.KLINES;
      DataInterval: DataIntervalEnum.DAILY;
      KLinesInterval: Exclude<KLinesIntervalEnum, "3d" | "1w" | "1mo">;
    }
  | {
      Data: DataEnum.KLINES;
      DataInterval: DataIntervalEnum.MONTHLY;
      KLinesInterval: KLinesIntervalEnum;
    }
);

type FuturesMarketConfigType = {
  Market: MarketEnum.FUTURES;
  FuturesType: FuturestEnum;
} & (
  | ({
      DataInterval: DataIntervalEnum.DAILY;
    } & (
      | {
          Data:
            | DataEnum.AGG_TRADES
            | DataEnum.BOOK_DEPTH
            | DataEnum.BOOK_TICKER
            | DataEnum.LIQUIDATION_SNAPSHOT
            | DataEnum.METRICS
            | DataEnum.TRADES;
        }
      | {
          Data:
            | DataEnum.KLINES
            | DataEnum.INDEX_PRICE_KLINES
            | DataEnum.MARK_PRICE_KLINES
            | DataEnum.PREMIUM_INDEX_KLINES;
          KLinesInterval: KLinesIntervalEnum;
        }
    ))
  | ({
      DataInterval: DataIntervalEnum.MONTHLY;
    } & (
      | {
          Data:
            | DataEnum.AGG_TRADES
            | DataEnum.BOOK_TICKER
            | DataEnum.FUNDING_RATE
            | DataEnum.TRADES;
        }
      | {
          Data:
            | DataEnum.KLINES
            | DataEnum.INDEX_PRICE_KLINES
            | DataEnum.MARK_PRICE_KLINES
            | DataEnum.PREMIUM_INDEX_KLINES;
          KLinesInterval: KLinesIntervalEnum;
        }
    ))
);

type OptionMarketConfigType = {
  Market: MarketEnum.OPTION;
  DataInterval: DataIntervalEnum.DAILY;
  Data: DataEnum.BVOL_INDEX | DataEnum.EOH_SUMMARY;
};

type MarketConfigType =
  | SpotMarketConfigType
  | FuturesMarketConfigType
  | OptionMarketConfigType;

export type DownloadHistoricalDataFormData = {
  Ticker: string;
  StartDate: string;
  EndDate: string;
} & MarketConfigType;

export type DateObjectType = {
  year: number;
  month: number;
  day: number;
};

export type FormDataContextType = {
  formData: DownloadHistoricalDataFormData;
  formDataHandler: (event: FormDataReducerActionType) => void;
};

export type StepContextType = {
  step: number;
  stepHandler: (direction: "next" | "previous") => void;
};

export type TickerListContextType = {
  loading: boolean;

  tickerList: string[];
  tickerHandler: (signal: AbortSignal) => void;
};

export type KLinesIntervalListContextType = {
  loading: boolean;

  kLinesIntervalList: string[];
  kLinesIntervalListHandler: (signal: AbortSignal) => void;
};

export type FormDataReducerActionType = {
  type: "SELECT_INPUT_CHANGE";
  data: {
    field: keyof DownloadHistoricalDataFormData;
    value: string;
  };
};

export type ComboBoxValueListType = {
  value: string;
  label: string;
};
