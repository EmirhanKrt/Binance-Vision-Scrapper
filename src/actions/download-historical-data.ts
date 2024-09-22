import { DownloadHistoricalDataFormData } from "@/lib/types";

import { generateDateList, generateDateObject } from "@/lib/utils/date";
import {
  generateFileBasePathObject,
  generateSourceFilePath
} from "@/lib/utils/file-path";

export async function downloadHistoricalData(
  formData: DownloadHistoricalDataFormData
) {
  const startDate = generateDateObject(new Date(formData.StartDate));
  const endDate = generateDateObject(new Date(formData.EndDate));

  const dateList = generateDateList(formData.DataInterval, startDate, endDate);

  const { sourcePath, destinationPath, fileNamePrefix } =
    generateFileBasePathObject(formData);

  const sourceFilePathList = dateList.map((date) =>
    generateSourceFilePath(sourcePath, fileNamePrefix, date)
  );
}
