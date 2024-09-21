export enum MarketEnum {
  FUTURES = "futures",
  OPTION = "option",
  SPOT = "spot"
}

export enum FuturestEnum {
  COIN_M = "cm",
  USD_M = "um"
}

export enum DataIntervalEnum {
  DAILY = "daily",
  MONTHLY = "monthly"
}

export enum DataEnum {
  AGG_TRADES = "aggTrades",
  KLINES = "klines",
  TRADES = "trades",
  BOOK_DEPTH = "bookDepth",
  BOOK_TICKER = "bookTicker",
  INDEX_PRICE_KLINES = "indexPriceKlines",
  LIQUIDATION_SNAPSHOT = "liquidationSnapshot",
  MARK_PRICE_KLINES = "markPriceKlines",
  METRICS = "metrics",
  PREMIUM_INDEX_KLINES = "premiumIndexKlines",
  FUNDING_RATE = "fundingRate",
  BVOL_INDEX = "BVOLIndex",
  EOH_SUMMARY = "EOHSummary"
}

export enum KLinesIntervalEnum {
  "1 Second" = "1s",
  "1 Minute" = "1m",
  "3 Minutes" = "3m",
  "5 Minutes" = "5m",
  "15 Minutes" = "15m",
  "30 Minutes" = "30m",
  "1 Hour" = "1h",
  "2 Hours" = "2h",
  "4 Hours" = "4h",
  "6 Hours" = "6h",
  "8 Hours" = "8h",
  "12 Hours" = "12h",
  "1 Day" = "1d",
  "3 Days" = "3d",
  "1 Week" = "1w",
  "1 Month" = "1mo"
}
