export const formatInitialDateForTextInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const textFromTextInputToDate = (value: string): Date | undefined => {
  if (!value) return;
  const dateParts = value.split("-");
  const [year, month, day] = dateParts.map((item) => Number(item));

  return new Date(year, month - 1, day);
};

export const dateToTextInputFormat = (value: Date): string | undefined => {
  if (!value) return;
  const day = value.getDate().toString().padStart(2, "0");
  const month = (value.getMonth() + 1).toString().padStart(2, "0");
  const year = value.getFullYear();
  const dateParts = [year, month, day];

  return dateParts.join("-");
};
