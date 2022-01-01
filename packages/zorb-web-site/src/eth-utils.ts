
export const sliceAddress = (address: string) => {
  const showChars = 4;
  const PREFIX_ADDRESS = "0x";
  const addressFirst = address.slice(0, showChars + PREFIX_ADDRESS.length);
  const addressLast = address.slice(address.length - showChars);
  return `${addressFirst}…${addressLast}`;
};