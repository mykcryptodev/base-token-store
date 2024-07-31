export const toDecimalPlace = (value: string | undefined | null, decimalPlaces: number): string => {
  if (!value) return "";
  return value.replace(new RegExp(`(\\.\\d{${decimalPlaces}})\\d+`), "$1");
}