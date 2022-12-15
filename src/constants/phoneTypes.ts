export const phoneTypes = [
  {
    value: "1",
    label: "Fijo",
  },
  {
    value: "2",
    label: "Celular",
  },
];

export const getPhoneTypeName = (phoneTypeId?: number | null) => {
  if (!phoneTypeId) {
    return "";
  }

  return (
    phoneTypes.find((item) => item.value === phoneTypeId.toString())?.label ||
    ""
  );
};
