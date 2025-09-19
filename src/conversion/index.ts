import { NEPALI_DIGITS } from "@/constants.ts"

export const toNepali = (input: string | number): string => {
  const str = input.toString()

  return str.replace(/[0-9]/g, (digit: string) => NEPALI_DIGITS.split("")[parseInt(digit)] || digit)
}

export const toEnglish = (input: string | number): string => {
  const str = input.toString()

  return str.split("").map((char: string) => {
    const index = NEPALI_DIGITS.indexOf(char)

    return index > -1 ? index.toString() : char
  }).join("")
}

export const parseNepaliNumber = (nepaliNumber: string): number => {
  const englishString = toEnglish(nepaliNumber.replace(/[, ]/g, ""))
  const parsed = parseFloat(englishString)

  return isNaN(parsed) ? 0 : parsed
}

export const convertMixed = (text: string, toNepaliNumber: boolean = true): string => {
  if (toNepaliNumber) {
    return toNepali(text)
  }

  return toEnglish(text)
}
