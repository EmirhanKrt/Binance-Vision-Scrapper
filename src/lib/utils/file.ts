import { promises } from "fs";

/**
 * Fetches a file from the source file path and returns its content as an ArrayBuffer.
 * If the fetch operation fails, it logs an error message and returns null.
 *
 * @param {string} sourceFilePath - The URL or path to the source file to be fetched.
 * @returns {Promise<ArrayBuffer | null>} A promise that resolves to the file content as an ArrayBuffer, or null if the fetch fails.
 */
export async function fetchSourceFile(
  sourceFilePath: string
): Promise<ArrayBuffer | null> {
  try {
    const response = await fetch(sourceFilePath);
    if (response.status !== 200) {
      throw new Error();
    }

    console.log(`Fetched ${sourceFilePath}`);

    return response.arrayBuffer();
  } catch (error) {
    console.log(
      `Failed to fetch ${sourceFilePath}, error:${
        (error as { message?: string }).message
      }`
    );

    return null;
  }
}

/**
 * Writes the merged content to a file named "merged.csv" in the given destination path.
 *
 * @param {string} destinationPath - The directory path where the merged file will be saved.
 * @param {string} fileContent - The content to be written to the file.
 * @returns {Promise<boolean>}
 */
export async function writeMergedFile(
  destinationPath: string,
  fileContent: string
): Promise<boolean> {
  await promises.writeFile(destinationPath, fileContent);
  console.log(`Wrote file to ${destinationPath}`);

  return true;
}
