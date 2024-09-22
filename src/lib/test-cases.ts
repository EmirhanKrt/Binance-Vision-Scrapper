import {
  DataEnum,
  DataIntervalEnum,
  FuturestEnum,
  KLinesIntervalEnum,
  MarketEnum
} from "@/lib/enums";
import { DownloadHistoricalDataFormData } from "@/lib/types";

export const TestCaseFormData: DownloadHistoricalDataFormData[] = [
  {
    Ticker: "BTCUSDT",
    StartDate: "2024-2-24",
    EndDate: "2024-3-1",

    Market: MarketEnum.SPOT,
    DataInterval: DataIntervalEnum.DAILY,
    Data: DataEnum.TRADES
  },
  {
    Ticker: "BTCUSDT",
    StartDate: "2024-2-24",
    EndDate: "2024-3-1",

    Market: MarketEnum.SPOT,
    DataInterval: DataIntervalEnum.DAILY,
    Data: DataEnum.KLINES,
    KLinesInterval: KLinesIntervalEnum["4 Hours"]
  },
  {
    Ticker: "BTCUSDT",
    StartDate: "2024-2-24",
    EndDate: "2024-3-1",

    Market: MarketEnum.SPOT,
    DataInterval: DataIntervalEnum.MONTHLY,
    Data: DataEnum.TRADES
  },
  {
    Ticker: "BTCUSDT",
    StartDate: "2024-2-24",
    EndDate: "2024-3-1",

    Market: MarketEnum.SPOT,
    DataInterval: DataIntervalEnum.MONTHLY,
    Data: DataEnum.KLINES,
    KLinesInterval: KLinesIntervalEnum["3 Days"]
  },
  {
    Ticker: "BTCUSD_PERP",
    StartDate: "2024-2-24",
    EndDate: "2024-3-1",

    Market: MarketEnum.FUTURES,
    FuturesType: FuturestEnum.COIN_M,
    DataInterval: DataIntervalEnum.DAILY,
    Data: DataEnum.TRADES
  },
  {
    Ticker: "BTCUSD_PERP",
    StartDate: "2024-2-24",
    EndDate: "2024-3-1",

    Market: MarketEnum.FUTURES,
    FuturesType: FuturestEnum.COIN_M,
    DataInterval: DataIntervalEnum.DAILY,
    Data: DataEnum.KLINES,
    KLinesInterval: KLinesIntervalEnum["4 Hours"]
  },
  {
    Ticker: "BTCUSD_PERP",
    StartDate: "2024-2-24",
    EndDate: "2024-3-1",

    Market: MarketEnum.FUTURES,
    FuturesType: FuturestEnum.COIN_M,
    DataInterval: DataIntervalEnum.MONTHLY,
    Data: DataEnum.TRADES
  },
  {
    Ticker: "BTCUSD_PERP",
    StartDate: "2024-2-24",
    EndDate: "2024-3-1",

    Market: MarketEnum.FUTURES,
    FuturesType: FuturestEnum.COIN_M,
    DataInterval: DataIntervalEnum.MONTHLY,
    Data: DataEnum.KLINES,
    KLinesInterval: KLinesIntervalEnum["3 Days"]
  },
  {
    Ticker: "BTCUSDT",
    StartDate: "2024-2-24",
    EndDate: "2024-3-1",

    Market: MarketEnum.FUTURES,
    FuturesType: FuturestEnum.USD_M,
    DataInterval: DataIntervalEnum.DAILY,
    Data: DataEnum.TRADES
  },
  {
    Ticker: "BTCUSDT",
    StartDate: "2024-2-24",
    EndDate: "2024-3-1",

    Market: MarketEnum.FUTURES,
    FuturesType: FuturestEnum.USD_M,
    DataInterval: DataIntervalEnum.DAILY,
    Data: DataEnum.KLINES,
    KLinesInterval: KLinesIntervalEnum["4 Hours"]
  },
  {
    Ticker: "BTCUSDT",
    StartDate: "2024-1-1",
    EndDate: "2024-2-1",

    Market: MarketEnum.FUTURES,
    FuturesType: FuturestEnum.USD_M,
    DataInterval: DataIntervalEnum.MONTHLY,
    Data: DataEnum.TRADES
  },
  {
    Ticker: "BTCUSDT",
    StartDate: "2024-2-24",
    EndDate: "2024-3-1",

    Market: MarketEnum.FUTURES,
    FuturesType: FuturestEnum.USD_M,
    DataInterval: DataIntervalEnum.MONTHLY,
    Data: DataEnum.KLINES,
    KLinesInterval: KLinesIntervalEnum["3 Days"]
  },
  {
    Ticker: "BTCBVOLUSDT",
    StartDate: "2024-2-24",
    EndDate: "2024-3-1",

    Market: MarketEnum.OPTION,
    DataInterval: DataIntervalEnum.DAILY,
    Data: DataEnum.BVOL_INDEX
  },
  {
    Ticker: "BTCUSDT",
    StartDate: "2023-10-21",
    EndDate: "2023-10-23",

    Market: MarketEnum.OPTION,
    DataInterval: DataIntervalEnum.DAILY,
    Data: DataEnum.EOH_SUMMARY
  }
];
