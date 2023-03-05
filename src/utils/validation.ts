import validate from "ip-validator";

export const isValidIPv4 = (ip: string) =>
  validate.ipv4(ip) &&
  ip.split(".").length === 4 &&
  /^[0-9]+$/.test(ip.split(".")[3]);
export const isValidIPv6 = (ip: string) =>
  validate.ipv6(ip) && ip.split(":").length === 8;

export const validateIp = (ip: string) => isValidIPv4(ip) || isValidIPv6(ip);
