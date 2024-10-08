import { DownloadHistoricalDataFormData } from "@/lib/types";
import { DataEnum, MarketEnum } from "@/lib/enums";
import {
  DATA_SOURCE_BASE_URL,
  FILE_NAME_SEPERATOR,
  FILE_PATH_SEPERATOR
} from "@/lib/constants";

/**
 * Joins the array with given seperator.
 *
 * @param {string[]} pathList - The path list.
 * @param {string} seperator - The seperator.
 * @returns {string} Joined string.
 */
export function generatePath(pathList: string[], seperator: string): string {
  return pathList.join(seperator);
}

/**
 * Generates an object containing sourcePath, destinationPath, and fileNamePrefix based on form data.
 *
 * @param {DownloadHistoricalDataFormData} formData - The form data used to determine the path structure.
 * @returns {{sourcePath: string, destinationPath: string, fileNamePrefix: string}}
 * - sourcePath: The full source path of source file.
 * - destinationPath: The destination path with the "output" folder as root.
 * - fileNamePrefix: The prefix for file.
 */
export function generateFileBasePathObject(
  formData: DownloadHistoricalDataFormData
): { sourcePath: string; destinationPath: string; fileNamePrefix: string } {
  const pathPartList = [DATA_SOURCE_BASE_URL, formData.Market];

  switch (formData.Market) {
    case MarketEnum.FUTURES:
      pathPartList.push(
        formData.FuturesType,
        formData.DataInterval,
        formData.Data,
        formData.Ticker
      );
      if (
        formData.Data === DataEnum.KLINES ||
        formData.Data === DataEnum.INDEX_PRICE_KLINES ||
        formData.Data === DataEnum.MARK_PRICE_KLINES ||
        formData.Data === DataEnum.PREMIUM_INDEX_KLINES
      ) {
        pathPartList.push(formData.KLinesInterval);
      }
      break;

    case MarketEnum.SPOT:
      pathPartList.push(formData.DataInterval, formData.Data, formData.Ticker);
      if (formData.Data === DataEnum.KLINES) {
        pathPartList.push(formData.KLinesInterval);
      }
      break;

    case MarketEnum.OPTION:
      pathPartList.push(formData.DataInterval, formData.Data, formData.Ticker);
      break;
  }

  const fileNamePrefixList = [formData.Ticker];

  switch (formData.Data) {
    case DataEnum.KLINES:
    case DataEnum.INDEX_PRICE_KLINES:
    case DataEnum.MARK_PRICE_KLINES:
    case DataEnum.PREMIUM_INDEX_KLINES:
      fileNamePrefixList.push(formData.KLinesInterval);
      break;
    default:
      fileNamePrefixList.push(formData.Data);
      break;
  }

  const sourcePath = generatePath(pathPartList, FILE_PATH_SEPERATOR);
  pathPartList.shift();

  pathPartList.unshift("output");
  const destinationPath = generatePath(pathPartList, FILE_PATH_SEPERATOR);

  const fileNamePrefix = generatePath(fileNamePrefixList, FILE_NAME_SEPERATOR);

  return {
    sourcePath,
    destinationPath,
    fileNamePrefix
  };
}

/**
 * Generates the full file path by combining the base path, file name prefix, and date.
 *
 * @param {string} basePath - The base path for the file.
 * @param {string} fileNamePrefix - The prefix of the file name, often based on ticker and data type.
 * @param {string} date - The date for the file, which is appended to the file name.
 * @param {boolean} [isSource=true] - Whether the path of file is source or destination.
 *
 * @returns {string} The full file path.
 */
export function generateFilePath(
  basePath: string,
  fileNamePrefix: string,
  date: string,
  isSource: boolean = true
): string {
  return `${basePath}${FILE_PATH_SEPERATOR}${fileNamePrefix}${FILE_NAME_SEPERATOR}${date}${
    isSource ? ".zip" : ""
  }`;
}
