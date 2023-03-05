declare module "ip-validator" {
  function ipv4(ip: string): boolean;
  function ipv6(ip: string): boolean;

  export { ipv4, ipv6 };
}
