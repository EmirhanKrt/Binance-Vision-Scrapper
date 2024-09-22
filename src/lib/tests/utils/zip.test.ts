import AdmZip from "adm-zip";
import { readContentOfFile, extractFile } from "@/lib/utils/zip";

jest.mock("adm-zip");

describe("File Handling Functions", () => {
  const mockZipEntry = {
    getData: jest.fn(),
    entryName: "test.csv"
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (AdmZip as jest.Mock).mockImplementation(() => ({
      getEntries: jest.fn(() => [mockZipEntry]),
      extractEntryTo: jest.fn(() => true)
    }));
  });

  describe("readContentOfFile", () => {
    it("should return content if first field is a number", () => {
      const mockContent = "1,field2,field3\nvalue1,value2,value3";
      mockZipEntry.getData.mockReturnValue(Buffer.from(mockContent));

      const result = readContentOfFile(new ArrayBuffer(8), "test.csv");
      expect(result).toBe(mockContent);
    });

    it("should remove the first line if first field is not a number", () => {
      const mockContent = "header1,header2\nvalue1,value2,value3";
      mockZipEntry.getData.mockReturnValue(Buffer.from(mockContent));

      const result = readContentOfFile(new ArrayBuffer(8), "test.csv");
      expect(result).toBe("value1,value2,value3");
    });

    it("should return empty string on error", () => {
      mockZipEntry.getData.mockImplementation(() => {
        throw new Error("Mock error");
      });

      const result = readContentOfFile(new ArrayBuffer(8), "test.csv");
      expect(result).toBe("");
    });
  });

  describe("extractFile", () => {
    it("should extract file and return true on success", () => {
      const result = extractFile(new ArrayBuffer(8), "./zip-test/test.csv");
      expect(result).toBe(true);
    });

    it("should return false on error", () => {
      (AdmZip as jest.Mock).mockImplementationOnce(() => {
        throw new Error("Mock error");
      });

      const result = extractFile(new ArrayBuffer(8), "/path/to/destination");
      expect(result).toBe(false);
    });
  });
});
