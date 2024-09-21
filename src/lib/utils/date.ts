import { DateObjectType } from "@/lib/types";
import { DataIntervalEnum } from "@/lib/enums";
import { DAY_COUNT_OF_MONTHS } from "@/lib/constants";

/**
 * Converts a Date object into a custom DateObjectType with year, month, and day properties.
 *
 * @param {Date} date - The Date object to convert.
 * @returns {DateObjectType} The converted object containing year, month, and day.
 */
export function generateDateObject(date: Date): DateObjectType {
  return {
    year: date.getFullYear(),
    month: date.getMonth(), // IMPORTANT - Month is used as 0-indexed (so January is 0).
    day: date.getDate()
  } as DateObjectType;
}

/**
 * Determines if a given year is a leap year.
 *
 * @param {number} year - The year to check.
 * @returns {boolean} True if the year is a leap year, false otherwise.
 */
function checkIsLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Returns the number of days in a given month, accounting for leap years.
 *
 * @param {number} month - The 0-indexed month.
 * @param {boolean} [isLeapYear=false] - Whether the year is a leap year (only affects February).
 * @returns {number} The number of days in the specified month.
 */
function getDayCountOfMonth(
  month: number,
  isLeapYear: boolean = false
): number {
  if (month === 1 && isLeapYear) return 29;

  return DAY_COUNT_OF_MONTHS[month];
}

/**
 * Formats a given year, month, and optionally a day into a string.
 *
 * @param {number} year - The year to format.
 * @param {number} month - The month (0-indexed).
 * @param {number} [day] - The optional day of the month to format.
 * @returns {string} A formatted date string in "YYYY-MM" or "YYYY-MM-DD" format.
 */
function formatDate(year: number, month: number, day?: number): string {
  const monthStr = (month + 1).toString().padStart(2, "0"); // Adjusted for 0-indexed month.

  return day
    ? `${year}-${monthStr}-${day.toString().padStart(2, "0")}`
    : `${year}-${monthStr}`;
}

/**
 * Generates a list of dates between the StartDate and EndDate based on the DataInterval.
 * Using this list while fetching data from source.
 *
 * @param {DataIntervalEnum} DataInterval - The interval for date generation.
 * @param {DateObjectType} StartDate - The starting date for the list.
 * @param {DateObjectType} EndDate - The ending date for the list.
 * @returns {string[]} A list of formatted date strings between StartDate and EndDate.
 */
export function generateDateList(
  DataInterval: DataIntervalEnum,
  StartDate: DateObjectType,
  EndDate: DateObjectType
): string[] {
  let {
    year: iterationYear,
    month: iterationMonth,
    day: iterationDay
  } = StartDate;

  const { year: endYear, month: endMonth, day: endDay } = EndDate;

  const dateList = [];

  // Loops through each day / month between StartDate and EndDate.
  // Adds formatted dates to dateList until the end date is reached.
  switch (DataInterval) {
    case DataIntervalEnum.DAILY:
      let isLeapYear = checkIsLeapYear(iterationYear);

      while (
        iterationYear < endYear ||
        (iterationYear === endYear &&
          (iterationMonth < endMonth ||
            (iterationMonth === endMonth && iterationDay <= endDay)))
      ) {
        dateList.push(formatDate(iterationYear, iterationMonth, iterationDay));

        iterationDay++;
        const dayCount = getDayCountOfMonth(iterationMonth, isLeapYear);

        if (iterationDay > dayCount) {
          iterationDay = 1;
          iterationMonth++;
        }

        if (iterationMonth > 11) {
          iterationMonth = 0;
          iterationYear++;
          isLeapYear = checkIsLeapYear(iterationYear);
        }
      }

      break;

    case DataIntervalEnum.MONTHLY:
      while (
        iterationYear < endYear ||
        (iterationYear === endYear && iterationMonth <= endMonth)
      ) {
        dateList.push(formatDate(iterationYear, iterationMonth));

        iterationMonth++;
        if (iterationMonth > 11) {
          iterationMonth = 0;
          iterationYear++;
        }
      }

      break;
  }

  return dateList;
}
