import { NEPALI_DIGITS } from "@/constants.ts"

/**
 * Convert English digits (0-9) to Nepali digits (०-९)
 *
 * @param input {string | number} - The English number to convert
 *
 * @returns {string} - The Nepali string
 */
export const toNepali = (input: string | number): string => {
  const str = input.toString()

  return str.replace(/[0-9]/g, (digit: string) => NEPALI_DIGITS.split("")[parseInt(digit)] || digit)
}

/**
 * Convert Nepali digits (०-९) to English digits (0-9)
 *
 * @param input {string | number} - Nepali number as string
 *
 * @returns {string} - The English string
 */
export const toEnglish = (input: string | number): string => {
  const str = input.toString()

  return str.split("").map((char: string) => {
    const index = NEPALI_DIGITS.indexOf(char)

    return index > -1 ? index.toString() : char
  }).join("")
}

/**
 * Parse Nepali number string to JavaScript number
 *
 * @param nepaliNumber {string} - Nepali number
 *
 * @returns {number} - The JavaScript number
 */
export const parseNepaliNumber = (nepaliNumber: string): number => {
  const englishString = toEnglish(nepaliNumber.replace(/[, ]/g, ""))
  const parsed = parseFloat(englishString)

  return isNaN(parsed) ? 0 : parsed
}

/**
 * Convert mixed content while preserving non-numeric text
 *
 * @param text {string} - The text to convert
 * @param toNepaliNumber {boolean} - Whether to convert english numbers to nepali or not.
 *
 * @returns {string} - The converted text
 */
export const convertMixed = (text: string, toNepaliNumber: boolean = true): string => {
  if (toNepaliNumber) {
    return toNepali(text)
  }

  return toEnglish(text)
}
