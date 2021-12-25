import { gradientForAddress } from "./lib";

export const getZorbGradients = (address: string) => {
  const gradient = gradientForAddress(address);
  return `radial-gradient(75.29% 75.29% at 64.96% 24.36%, ${gradient[0]} 15.62%, ${gradient[1]} 39.58%, ${gradient[2]} 72.92%, ${gradient[3]} 90.62%, ${gradient[4]} 100%)`;
};
