import { generateDateObject, generateDateList } from "@/lib/utils/date";
import { DataIntervalEnum } from "@/lib/enums";

describe("Date Utility Functions", () => {
  describe("generateDateObject", () => {
    it("should convert a Date object to DateObjectType", () => {
      const testCaseList = [
        {
          input: new Date("2024-1-1"),
          expected: {
            year: 2024,
            month: 0,
            day: 1
          }
        },
        {
          input: new Date("2024-1-01"),
          expected: {
            year: 2024,
            month: 0,
            day: 1
          }
        },
        {
          input: new Date("2024-01-1"),
          expected: {
            year: 2024,
            month: 0,
            day: 1
          }
        },
        {
          input: new Date("2024-01-01"),
          expected: {
            year: 2024,
            month: 0,
            day: 1
          }
        },
        {
          input: new Date("2024-12-31"),
          expected: {
            year: 2024,
            month: 11,
            day: 31
          }
        }
      ];

      testCaseList.forEach((testCase) => {
        expect(generateDateObject(testCase.input)).toEqual(testCase.expected);
      });
    });
  });

  describe("generateDateList", () => {
    it("should generate a list of dates daily", () => {
      const testCaseList = [
        {
          input: {
            dataInterval: DataIntervalEnum.DAILY,
            startDate: generateDateObject(new Date("2024-2-24")),
            endDate: generateDateObject(new Date("2024-3-1"))
          },
          expected: [
            "2024-02-24",
            "2024-02-25",
            "2024-02-26",
            "2024-02-27",
            "2024-02-28",
            "2024-02-29",
            "2024-03-01"
          ]
        },
        {
          input: {
            dataInterval: DataIntervalEnum.DAILY,
            startDate: generateDateObject(new Date("2023-2-24")),
            endDate: generateDateObject(new Date("2023-3-1"))
          },
          expected: [
            "2023-02-24",
            "2023-02-25",
            "2023-02-26",
            "2023-02-27",
            "2023-02-28",
            "2023-03-01"
          ]
        }
      ];

      testCaseList.forEach((testCase) => {
        expect(
          generateDateList(
            testCase.input.dataInterval,
            testCase.input.startDate,
            testCase.input.endDate
          )
        ).toEqual(testCase.expected);
      });
    });

    it("should generate a list of dates monthly", () => {
      const testCaseList = [
        {
          input: {
            dataInterval: DataIntervalEnum.MONTHLY,
            startDate: generateDateObject(new Date("2023-2-24")),
            endDate: generateDateObject(new Date("2024-3-1"))
          },
          expected: [
            "2023-02",
            "2023-03",
            "2023-04",
            "2023-05",
            "2023-06",
            "2023-07",
            "2023-08",
            "2023-09",
            "2023-10",
            "2023-11",
            "2023-12",
            "2024-01",
            "2024-02",
            "2024-03"
          ]
        }
      ];

      testCaseList.forEach((testCase) => {
        expect(
          generateDateList(
            testCase.input.dataInterval,
            testCase.input.startDate,
            testCase.input.endDate
          )
        ).toEqual(testCase.expected);
      });
    });
  });
});
