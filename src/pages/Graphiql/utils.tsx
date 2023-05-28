export function isValidJsonString(str: string): { isValid: boolean; errorMessage: string } {
  try {
    JSON.parse(str);
    return { isValid: true, errorMessage: '' };
  } catch (e) {
    return { isValid: false, errorMessage: (e as Error).message };
  }
}
