import { validateIp } from "../utils/validation";
import isValidDomain from "is-valid-domain";

const baseUrl = "https://geo.ipify.org/api/v2/country,city";
const APFY_KEY = "at_7J6VMVmKqDqjfaqYmHRVitGnstP2W";

export type BadResponse = {
  code: number;
  messages: string;
};

export async function getIpLocationData<T>(value?: string) {
  let query = `apiKey=${APFY_KEY}`;
  let ipOrDomain = value ? value : null;
  if (ipOrDomain && validateIp(ipOrDomain)) {
    query = `${query}&ipAddress=${ipOrDomain}`;
  } else if (ipOrDomain && isValidDomain(ipOrDomain)) {
    query = `${query}&domain=${ipOrDomain}`;
  }
  const url = `${baseUrl}?${query}`;
  console.log(url);
  const response = await fetch(url, { method: "GET" });
  console.log(response);
  if (response.ok) {
    return await (<T>response.json());
  } else {
    const badResponse: BadResponse = await response.json();
    console.log(badResponse);
    throw new Error(badResponse.messages);
  }
}

//https://geo.ipify.org/api/v2/country,city?apiKey=at_7J6VMVmKqDqjfaqYmHRVitGnstP2W&ipAddress=8.8.8.8
