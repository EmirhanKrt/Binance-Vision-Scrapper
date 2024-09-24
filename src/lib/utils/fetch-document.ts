function parseXml(text: string) {
  return new DOMParser().parseFromString(text, "application/xml");
}

export async function fetchDocument(
  url: string,
  signal: AbortSignal
): Promise<Document | null> {
  const response = await fetch(url + "/", { signal });
  if (!response.ok) {
    console.log(`HTTP error! status: ${response.status}`);
    return null;
  }

  const responseAsText = await response.text();
  return parseXml(responseAsText);
}

export function generateRequestUrl(requestUrl: string, marker: string = "") {
  if (marker !== "") return requestUrl + `/&marker=${marker}`;

  return requestUrl;
}
