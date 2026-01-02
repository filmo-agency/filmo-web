export const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL

export async function getStrapiData(url: string) {
  try {
    const response = await fetch(`${STRAPI_BASE_URL}${url}`, {
      next: { revalidate: 60 * 60 * 24}
    });
    if (!response.ok) {
      throw new Error(`Error fetching data from Strapi: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export function toRoman(num: number, id: string): string | number {

  if (id === 'interamerican') return num;

  const romanNumerals = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" }
  ];

  let result = "";

  for (const { value, symbol } of romanNumerals) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }

  return result;
}