const baseUrl = "https://geo.ipify.org/api/v2/country,city";

const APFY_KEY = "at_7J6VMVmKqDqjfaqYmHRVitGnstP2W";
const query = `apiKey=${APFY_KEY}`;

export async function getIpLocationData<T>(ip?: string) {
  const ipAddress = ip ? `&ipAddress=${ip}` : null;
  const url = `${baseUrl}?${query}${ipAddress ? ipAddress : ""}`;
  // console.log(url);
  const response = await fetch(url, { method: "GET" });
  const locationData = await (<T>response.json());
  return locationData;
}

//https://geo.ipify.org/api/v2/country,city?apiKey=at_7J6VMVmKqDqjfaqYmHRVitGnstP2W&ipAddress=8.8.8.8
