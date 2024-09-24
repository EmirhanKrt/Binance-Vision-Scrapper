"use server";

import { DownloadHistoricalDataFormData } from "@/lib/types";

import { generateDateList, generateDateObject } from "@/lib/utils/date";
import {
  generateFileBasePathObject,
  generateFilePath
} from "@/lib/utils/file-path";
import { extractFile, readContentOfFile } from "@/lib/utils/zip";
import { fetchSourceFile, writeMergedFile } from "@/lib/utils/file";

export async function downloadHistoricalData(formData: FormData) {
  try {
    const formDataConverted = Object.fromEntries(
      formData
    ) as DownloadHistoricalDataFormData;

    const startDate = generateDateObject(new Date(formDataConverted.StartDate));
    const endDate = generateDateObject(new Date(formDataConverted.EndDate));

    const dateList = generateDateList(
      formDataConverted.DataInterval,
      startDate,
      endDate
    );

    const { sourcePath, destinationPath, fileNamePrefix } =
      generateFileBasePathObject(formDataConverted);

    const downloadPromises = dateList.map(async (date) => {
      const sourceFilePath = generateFilePath(sourcePath, fileNamePrefix, date);
      const destinationFilePath = generateFilePath(
        destinationPath,
        fileNamePrefix,
        date,
        false
      );

      const responseAsArrayBuffer = await fetchSourceFile(sourceFilePath);
      if (!responseAsArrayBuffer) {
        return null;
      }

      const fileContent = readContentOfFile(
        responseAsArrayBuffer,
        destinationFilePath
      );
      extractFile(responseAsArrayBuffer, destinationFilePath);

      return fileContent;
    });

    const fileContentList = await Promise.all(downloadPromises);

    await writeMergedFile(
      destinationPath + "/merged.csv",
      fileContentList.filter((file) => file !== null).join("")
    );
  } catch (error: any) {
    return { success: false, errorMessage: (error.message as string) || "" };
  }

  return { success: true, errorMessage: "" };
}
