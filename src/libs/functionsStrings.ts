export const validateString = (
  value: any,
  type: "str" | "int" | "date" = "str"
) => {
  if (value === "" || !value) return null;

  if (type === "str") {
    return value.toString().trim();
  }

  if (type === "int") {
    const result = isNaN(value) ? 0 : Math.trunc(Number(value));

    if (result === 0) return null;

    return result;
  }

  if (type === "date") {
    if (isNaN(Date.parse(value))) return null;

    return value.toString().trim();
  }
};

export const emptyValue = (value: any, type: "str" | "int" = "str") => {
  if (!value) return true;

  if (type === "str") {
    if (value === "") return true;

    return false;
  }

  if (type === "int") {
    const result = isNaN(value) ? 0 : Math.trunc(Number(value));

    if (result === 0) return true;

    return false;
  }
};

export const includesString = (arrayToFind: string[], strings: string[]) => {
  const result = [];

  for (let value of strings) {
    result.push(arrayToFind.includes(value));
  }

  return result.includes(true) ? true : false;
};

export const stringIncludes = (text: string, equalValue: string[]) => {
  const result = [];

  for (let value of equalValue) {
    result.push(text === value);
  }

  return result.includes(true) ? true : false;
};

export const deleteAccents = (text: string) => {
  // WITHOUT ACCENTS IN CAPITAL LETTERS
  let result = text
    .replace("Á", "A")
    .replace("É", "E")
    .replace("Í", "I")
    .replace("Ó", "O")
    .replace("Ú", "U");

  // WITHOUT ACCENTS IN LOWERCASE LETTERS
  result = result
    .replace("á", "a")
    .replace("é", "e")
    .replace("í", "i")
    .replace("ó", "o")
    .replace("ú", "u");

  return result;
};

export const formatDate = (date: string | null) => {
  if (!date) return "No registra";

  const length = date.length;

  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(length - 2, length);

  return day + "/" + month + "/" + year;
};

export const convertToCurrency = (value: any) => {
  if (value === "" || !value || value === null || isNaN(Number(value)))
    return "$ 0";

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    minimumFractionDigits: 2,
    currency: "USD",
  });

  let currentValue = formatter.format(Number(value));
  currentValue = currentValue.substring(0, currentValue.length - 3);

  return currentValue.replaceAll(",", ".");
};
