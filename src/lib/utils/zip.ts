import AdmZip from "adm-zip";

/**
 * Reads the content of the first file in a zip archive represented as an ArrayBuffer.
 * If the first field of the first line is a number, it returns the full content as a string.
 * If the first field is not a number, it removes the first line and returns the modified content.
 *
 * @param {ArrayBuffer} zipFileArrayBuffer - The ArrayBuffer representing the zip file.
 * @param {string} destinationFilePath - The path where the extracted file should be saved.
 * @returns {string} The content of the file, potentially modified by removing the first line.
 */
export function readContentOfFile(
  zipFileArrayBuffer: ArrayBuffer,
  destinationFilePath: string
): string {
  try {
    const zipFileAsAdmZip = new AdmZip(Buffer.from(zipFileArrayBuffer));

    const zipEntry = zipFileAsAdmZip.getEntries()[0];

    const fileContent = zipEntry.getData().toString("utf8");

    const fileLineList = fileContent.split("\n");
    const firstLine = fileLineList[0];
    const firstLineFieldList = firstLine.split(",");
    const firstLineFirstField = firstLineFieldList[0];

    if (isNaN(Number(firstLineFirstField))) {
      fileLineList.shift();
      return fileLineList.join("\n");
    }

    console.log(`Red content of file ${destinationFilePath}`);

    return fileContent;
  } catch (error) {
    console.log(
      `Failed to read content of file ${destinationFilePath}, error:${
        (error as { message?: string }).message
      }`
    );

    return "";
  }
}

/**
 * Extracts the first file (Binance sends single file)
 * from a zip archive represented as an ArrayBuffer
 * and saves it to the specified destination file path.
 *
 * @param {ArrayBuffer} zipFileArrayBuffer - The ArrayBuffer representing the zip file.
 * @param {string} destinationFilePath - The path where the extracted file should be saved.
 * @returns {boolean}
 */
export function extractFile(
  zipFileArrayBuffer: ArrayBuffer,
  destinationFilePath: string
): boolean {
  try {
    const zipFileAsAdmZip = new AdmZip(Buffer.from(zipFileArrayBuffer));

    const zipEntry = zipFileAsAdmZip.getEntries()[0];

    const extractStatus = zipFileAsAdmZip.extractEntryTo(
      zipEntry,
      destinationFilePath,
      false,
      true
    );

    console.log(`Extracted zip file to ${destinationFilePath}`);

    return extractStatus;
  } catch (error) {
    console.log(
      `Failed to Extract zip file to ${destinationFilePath}, error:${
        (error as { message?: string }).message
      }`
    );

    return false;
  }
}
