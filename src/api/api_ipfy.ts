import { validateIp } from "../utils/validation";
import isValidDomain from "is-valid-domain";
let ipfyKey = import.meta.env.VITE_APIFY_KEY || process.env.VITE_APIFY_KEY;

const baseUrl = "https://geo.ipify.org/api/v2/country,city";
console.log(ipfyKey);

export type BadResponse = {
  code: number;
  messages: string;
};

export async function getIpLocationData<T>(value?: string) {
  let query = `apiKey=${ipfyKey}`;
  let ipOrDomain = value ? value : null;
  if (ipOrDomain && validateIp(ipOrDomain)) {
    query = `${query}&ipAddress=${ipOrDomain}`;
  } else if (ipOrDomain && isValidDomain(ipOrDomain)) {
    query = `${query}&domain=${ipOrDomain}`;
  }
  const url = `${baseUrl}?${query}`;
  try {
    console.log("FETCH");
    const response = await fetch(url, { method: "GET" });
    if (response.ok) {
      return await (<T>response.json());
    } else {
      const badResponse: BadResponse = await response.json();
      throw new Error(badResponse.messages);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
