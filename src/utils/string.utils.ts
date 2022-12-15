export const getStringsFormatted = (strings: string[]) => {
  if (!strings.length) {
    return "";
  }
  if (strings.length === 1) {
    return strings[0];
  }
  const clonedStrings = Array.from(strings);
  const lastString = clonedStrings.pop();
  let result = clonedStrings.join(", ");
  result += ` y ${lastString}`;

  return result;
};
