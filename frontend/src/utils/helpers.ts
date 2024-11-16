export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
