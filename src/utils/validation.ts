import validate from "ip-validator";

export const isValidIPv4 = (ip: string) =>
  validate.ipv4(ip) && ip.split(".").length === 4;
export const isValidIPv6 = (ip: string) =>
  validate.ipv6(ip) && ip.split(":").length === 8;
