// TODO: better localization

export function getNumber(str: string) {
  const num = parseFloat(str.replace(",", "."));
  if (!Number.isNaN(num)) {
    return num;
  }

  return undefined;
}

export function getNumberyString(str: string) {
  if (str === "" || str === "0") {
    return str;
  }
  if (
    str.length > 1 &&
    (str[str.length - 1] === "." || str[str.length - 1] === ",") &&
    (str.match(/\./g) ?? []).length <= 1 &&
    (str.match(/,/g) ?? []).length <= 1
  ) {
    return str;
  }
  return undefined;
}
