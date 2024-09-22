import {
  DATA_SOURCE_BASE_URL,
  FILE_NAME_SEPERATOR,
  FILE_PATH_SEPERATOR
} from "@/lib/constants";

import {
  DataEnum,
  DataIntervalEnum,
  KLinesIntervalEnum,
  MarketEnum
} from "@/lib/enums";

import { TestCaseFormData } from "@/lib/test-cases";

import {
  generateFileBasePathObject,
  generatePath,
  generateFilePath
} from "@/lib/utils/file-path";

describe("File Path Utility Functions", () => {
  describe("generatePath", () => {
    it("should join path list with seperator", () => {
      const testCaseList = [
        {
          pathList: [
            DATA_SOURCE_BASE_URL,
            MarketEnum.SPOT,
            DataIntervalEnum.DAILY,
            DataEnum.AGG_TRADES,
            "BTCUSDT"
          ],
          seperator: FILE_PATH_SEPERATOR,
          expected:
            "https://data.binance.vision/data/spot/daily/aggTrades/BTCUSDT"
        },
        {
          pathList: [
            DATA_SOURCE_BASE_URL,
            MarketEnum.SPOT,
            DataIntervalEnum.DAILY,
            DataEnum.KLINES,
            "BTCUSDT",
            KLinesIntervalEnum["4 Hours"]
          ],
          seperator: FILE_PATH_SEPERATOR,
          expected:
            "https://data.binance.vision/data/spot/daily/klines/BTCUSDT/4h"
        },
        {
          pathList: [
            DATA_SOURCE_BASE_URL,
            MarketEnum.SPOT,
            DataIntervalEnum.MONTHLY,
            DataEnum.AGG_TRADES,
            "BTCUSDT"
          ],
          seperator: FILE_PATH_SEPERATOR,
          expected:
            "https://data.binance.vision/data/spot/monthly/aggTrades/BTCUSDT"
        },
        {
          pathList: [
            DATA_SOURCE_BASE_URL,
            MarketEnum.SPOT,
            DataIntervalEnum.MONTHLY,
            DataEnum.KLINES,
            "BTCUSDT",
            KLinesIntervalEnum["3 Days"]
          ],
          seperator: FILE_PATH_SEPERATOR,
          expected:
            "https://data.binance.vision/data/spot/monthly/klines/BTCUSDT/3d"
        },
        {
          pathList: ["BTCUSDT", DataEnum.TRADES, "2024-01"],
          seperator: FILE_NAME_SEPERATOR,
          expected: "BTCUSDT-trades-2024-01"
        },
        {
          pathList: ["BTCUSDT", KLinesIntervalEnum["3 Days"], "2024-01"],
          seperator: FILE_NAME_SEPERATOR,
          expected: "BTCUSDT-3d-2024-01"
        }
      ];

      testCaseList.forEach((testCase) => {
        expect(generatePath(testCase.pathList, testCase.seperator)).toEqual(
          testCase.expected
        );
      });
    });
  });

  describe("generateFileBasePathObject", () => {
    it("should generate a file base path object", () => {
      const testCaseList = [
        {
          formData: TestCaseFormData[0],
          expected: {
            sourcePath:
              "https://data.binance.vision/data/spot/daily/trades/BTCUSDT",
            destinationPath: "output/spot/daily/trades/BTCUSDT",
            fileNamePrefix: "BTCUSDT-trades"
          }
        },
        {
          formData: TestCaseFormData[1],
          expected: {
            sourcePath:
              "https://data.binance.vision/data/spot/daily/klines/BTCUSDT/4h",
            destinationPath: "output/spot/daily/klines/BTCUSDT/4h",
            fileNamePrefix: "BTCUSDT-4h"
          }
        },
        {
          formData: TestCaseFormData[2],
          expected: {
            sourcePath:
              "https://data.binance.vision/data/spot/monthly/trades/BTCUSDT",
            destinationPath: "output/spot/monthly/trades/BTCUSDT",
            fileNamePrefix: "BTCUSDT-trades"
          }
        },
        {
          formData: TestCaseFormData[3],
          expected: {
            sourcePath:
              "https://data.binance.vision/data/spot/monthly/klines/BTCUSDT/3d",
            destinationPath: "output/spot/monthly/klines/BTCUSDT/3d",
            fileNamePrefix: "BTCUSDT-3d"
          }
        },
        {
          formData: TestCaseFormData[4],
          expected: {
            sourcePath:
              "https://data.binance.vision/data/futures/cm/daily/trades/BTCUSD_PERP",
            destinationPath: "output/futures/cm/daily/trades/BTCUSD_PERP",
            fileNamePrefix: "BTCUSD_PERP-trades"
          }
        },
        {
          formData: TestCaseFormData[5],
          expected: {
            sourcePath:
              "https://data.binance.vision/data/futures/cm/daily/klines/BTCUSD_PERP/4h",
            destinationPath: "output/futures/cm/daily/klines/BTCUSD_PERP/4h",
            fileNamePrefix: "BTCUSD_PERP-4h"
          }
        },
        {
          formData: TestCaseFormData[6],
          expected: {
            sourcePath:
              "https://data.binance.vision/data/futures/cm/monthly/trades/BTCUSD_PERP",
            destinationPath: "output/futures/cm/monthly/trades/BTCUSD_PERP",
            fileNamePrefix: "BTCUSD_PERP-trades"
          }
        },
        {
          formData: TestCaseFormData[7],
          expected: {
            sourcePath:
              "https://data.binance.vision/data/futures/cm/monthly/klines/BTCUSD_PERP/3d",
            destinationPath: "output/futures/cm/monthly/klines/BTCUSD_PERP/3d",
            fileNamePrefix: "BTCUSD_PERP-3d"
          }
        },
        {
          formData: TestCaseFormData[8],
          expected: {
            sourcePath:
              "https://data.binance.vision/data/futures/um/daily/trades/BTCUSDT",
            destinationPath: "output/futures/um/daily/trades/BTCUSDT",
            fileNamePrefix: "BTCUSDT-trades"
          }
        },
        {
          formData: TestCaseFormData[9],
          expected: {
            sourcePath:
              "https://data.binance.vision/data/futures/um/daily/klines/BTCUSDT/4h",
            destinationPath: "output/futures/um/daily/klines/BTCUSDT/4h",
            fileNamePrefix: "BTCUSDT-4h"
          }
        },
        {
          formData: TestCaseFormData[10],
          expected: {
            sourcePath:
              "https://data.binance.vision/data/futures/um/monthly/trades/BTCUSDT",
            destinationPath: "output/futures/um/monthly/trades/BTCUSDT",
            fileNamePrefix: "BTCUSDT-trades"
          }
        },
        {
          formData: TestCaseFormData[11],
          expected: {
            sourcePath:
              "https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/3d",
            destinationPath: "output/futures/um/monthly/klines/BTCUSDT/3d",
            fileNamePrefix: "BTCUSDT-3d"
          }
        },
        {
          formData: TestCaseFormData[12],
          expected: {
            sourcePath:
              "https://data.binance.vision/data/option/daily/BVOLIndex/BTCBVOLUSDT",
            destinationPath: "output/option/daily/BVOLIndex/BTCBVOLUSDT",
            fileNamePrefix: "BTCBVOLUSDT-BVOLIndex"
          }
        },
        {
          formData: TestCaseFormData[13],
          expected: {
            sourcePath:
              "https://data.binance.vision/data/option/daily/EOHSummary/BTCUSDT",
            destinationPath: "output/option/daily/EOHSummary/BTCUSDT",
            fileNamePrefix: "BTCUSDT-EOHSummary"
          }
        }
      ];

      testCaseList.forEach((testCase) => {
        expect(generateFileBasePathObject(testCase.formData)).toEqual(
          testCase.expected
        );
      });
    });
  });

  describe("generateFilePath", () => {
    it("should generate a source file path", () => {
      const testCaseList = [
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[0]),
          date: "2024-03-01",
          expected:
            "https://data.binance.vision/data/spot/daily/trades/BTCUSDT/BTCUSDT-trades-2024-03-01.zip"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[1]),
          date: "2024-03-01",

          expected:
            "https://data.binance.vision/data/spot/daily/klines/BTCUSDT/4h/BTCUSDT-4h-2024-03-01.zip"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[2]),
          date: "2024-03",
          expected:
            "https://data.binance.vision/data/spot/monthly/trades/BTCUSDT/BTCUSDT-trades-2024-03.zip"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[3]),
          date: "2024-03",
          expected:
            "https://data.binance.vision/data/spot/monthly/klines/BTCUSDT/3d/BTCUSDT-3d-2024-03.zip"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[4]),
          date: "2024-03-01",
          expected:
            "https://data.binance.vision/data/futures/cm/daily/trades/BTCUSD_PERP/BTCUSD_PERP-trades-2024-03-01.zip"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[5]),
          date: "2024-03-01",
          expected:
            "https://data.binance.vision/data/futures/cm/daily/klines/BTCUSD_PERP/4h/BTCUSD_PERP-4h-2024-03-01.zip"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[6]),
          date: "2024-03",
          expected:
            "https://data.binance.vision/data/futures/cm/monthly/trades/BTCUSD_PERP/BTCUSD_PERP-trades-2024-03.zip"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[7]),
          date: "2024-03",
          expected:
            "https://data.binance.vision/data/futures/cm/monthly/klines/BTCUSD_PERP/3d/BTCUSD_PERP-3d-2024-03.zip"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[8]),
          date: "2024-03-01",
          expected:
            "https://data.binance.vision/data/futures/um/daily/trades/BTCUSDT/BTCUSDT-trades-2024-03-01.zip"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[9]),
          date: "2024-03-01",
          expected:
            "https://data.binance.vision/data/futures/um/daily/klines/BTCUSDT/4h/BTCUSDT-4h-2024-03-01.zip"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[10]),
          date: "2024-03",
          expected:
            "https://data.binance.vision/data/futures/um/monthly/trades/BTCUSDT/BTCUSDT-trades-2024-03.zip"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[11]),
          date: "2024-01",
          expected:
            "https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/3d/BTCUSDT-3d-2024-01.zip"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[12]),
          date: "2024-03-01",
          expected:
            "https://data.binance.vision/data/option/daily/BVOLIndex/BTCBVOLUSDT/BTCBVOLUSDT-BVOLIndex-2024-03-01.zip"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[13]),
          date: "2023-10-23",
          expected:
            "https://data.binance.vision/data/option/daily/EOHSummary/BTCUSDT/BTCUSDT-EOHSummary-2023-10-23.zip"
        }
      ];

      testCaseList.forEach((testCase) => {
        expect(
          generateFilePath(
            testCase.fileBasePathObject.sourcePath,
            testCase.fileBasePathObject.fileNamePrefix,
            testCase.date
          )
        ).toEqual(testCase.expected);
      });
    });

    it("should generate a destination file path", () => {
      const testCaseList = [
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[0]),
          date: "2024-03-01",
          expected: "output/spot/daily/trades/BTCUSDT/BTCUSDT-trades-2024-03-01"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[1]),
          date: "2024-03-01",

          expected: "output/spot/daily/klines/BTCUSDT/4h/BTCUSDT-4h-2024-03-01"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[2]),
          date: "2024-03",
          expected: "output/spot/monthly/trades/BTCUSDT/BTCUSDT-trades-2024-03"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[3]),
          date: "2024-03",
          expected: "output/spot/monthly/klines/BTCUSDT/3d/BTCUSDT-3d-2024-03"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[4]),
          date: "2024-03-01",
          expected:
            "output/futures/cm/daily/trades/BTCUSD_PERP/BTCUSD_PERP-trades-2024-03-01"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[5]),
          date: "2024-03-01",
          expected:
            "output/futures/cm/daily/klines/BTCUSD_PERP/4h/BTCUSD_PERP-4h-2024-03-01"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[6]),
          date: "2024-03",
          expected:
            "output/futures/cm/monthly/trades/BTCUSD_PERP/BTCUSD_PERP-trades-2024-03"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[7]),
          date: "2024-03",
          expected:
            "output/futures/cm/monthly/klines/BTCUSD_PERP/3d/BTCUSD_PERP-3d-2024-03"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[8]),
          date: "2024-03-01",
          expected:
            "output/futures/um/daily/trades/BTCUSDT/BTCUSDT-trades-2024-03-01"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[9]),
          date: "2024-03-01",
          expected:
            "output/futures/um/daily/klines/BTCUSDT/4h/BTCUSDT-4h-2024-03-01"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[10]),
          date: "2024-03",
          expected:
            "output/futures/um/monthly/trades/BTCUSDT/BTCUSDT-trades-2024-03"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[11]),
          date: "2024-01",
          expected:
            "output/futures/um/monthly/klines/BTCUSDT/3d/BTCUSDT-3d-2024-01"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[12]),
          date: "2024-03-01",
          expected:
            "output/option/daily/BVOLIndex/BTCBVOLUSDT/BTCBVOLUSDT-BVOLIndex-2024-03-01"
        },
        {
          fileBasePathObject: generateFileBasePathObject(TestCaseFormData[13]),
          date: "2023-10-23",
          expected:
            "output/option/daily/EOHSummary/BTCUSDT/BTCUSDT-EOHSummary-2023-10-23"
        }
      ];

      testCaseList.forEach((testCase) => {
        expect(
          generateFilePath(
            testCase.fileBasePathObject.destinationPath,
            testCase.fileBasePathObject.fileNamePrefix,
            testCase.date,
            false
          )
        ).toEqual(testCase.expected);
      });
    });
  });
});
