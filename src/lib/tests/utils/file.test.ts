import { promises } from "fs";

import { fetchSourceFile, writeMergedFile } from "@/lib/utils/file";

global.fetch = jest.fn();

describe("File Operations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchSourceFile", () => {
    it("should return ArrayBuffer if fetch is successful", async () => {
      const mockResponse = new ArrayBuffer(8);
      (fetch as jest.Mock).mockResolvedValue({
        status: 200,
        arrayBuffer: jest.fn().mockResolvedValue(mockResponse)
      });

      const result = await fetchSourceFile("http://example.com/file");
      expect(result).toBe(mockResponse);
      expect(fetch).toHaveBeenCalledWith("http://example.com/file");
    });

    it("should return null if fetch fails", async () => {
      (fetch as jest.Mock).mockResolvedValue({
        status: 404
      });

      const result = await fetchSourceFile("http://example.com/file");
      expect(result).toBeNull();
      expect(fetch).toHaveBeenCalledWith("http://example.com/file");
    });

    it("should return null if an error occurs", async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

      const result = await fetchSourceFile("http://example.com/file");
      expect(result).toBeNull();
    });
  });

  describe("writeMergedFile", () => {
    it("should write content to the file and return true", async () => {
      const mockContent = "header1,header2\nvalue1,value2";
      const destinationPath = "/path/to/merged.csv";

      const writeFileMock = jest
        .spyOn(promises, "writeFile")
        .mockResolvedValue(undefined);

      const result = await writeMergedFile(destinationPath, mockContent);
      expect(result).toBe(true);
      expect(writeFileMock).toHaveBeenCalledWith(destinationPath, mockContent);
    });

    it("should throw an error if writing fails", async () => {
      const mockContent = "header1,header2\nvalue1,value2";
      const destinationPath = "/path/to/merged.csv";

      jest
        .spyOn(promises, "writeFile")
        .mockRejectedValue(new Error("Write error"));

      await expect(
        writeMergedFile(destinationPath, mockContent)
      ).rejects.toThrow("Write error");
    });
  });
});
