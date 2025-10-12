import { toEnglish, toNepali } from "@/conversion"
import type { FormatOptions } from "./types.ts"

/**
 * Format number with Nepali digits and locale-specific formatting
 *
 * @param number {number | string} - The number to format
 * @param options {FormatOptions} - Formating Options
 *
 * @returns {string} - The formatted number
 */
export const formatNepaliNumber = (number: number | string, options: FormatOptions = {}): string => {
  const {
    useNepaliDigits = true,
    addCommas = true,
    precision = 2,
    trimZero = true,
  } = options

  const num = typeof number === "string" ? parseFloat(toEnglish(number)) : number

  if (isNaN(num) || num === 0) {
    let zeroFormatted = trimZero ? 0 : (0).toFixed(precision)

    return (useNepaliDigits ? toNepali(zeroFormatted) : zeroFormatted).toString()
  }

  let formatted = num.toFixed(precision)

  // remove trailing zeros if there are any decimals for cleaner display
  if (formatted.includes(".") && trimZero) {
    formatted = formatted.replace(/\.0+$/, "") // remove .00, .000, etc.
  }

  if (addCommas) {
    formatted = addNepaliCommas(formatted)
  }

  return useNepaliDigits ? toNepali(formatted) : formatted
}

/**
 * Add commas in Nepali (Indian) number format (lakh/crore system)
 *
 * @param number {string | number} - The number to format
 *
 * @returns {string} - The formatted number
 */
export const addNepaliCommas = (number: string | number): string => {
  const parts = number.toString().split(".")
  let integerPart = parts[0] ?? ""
  const decimalPart = parts[1]

  const minusSign = integerPart.indexOf("-") > -1
  if (minusSign) {
    integerPart = integerPart.slice(1)
  }

  // apply indian numbering system (lakh/crore)
  if (integerPart.length > 3) {
    const lastThree = integerPart.slice(-3)
    const remaining = integerPart.slice(0, -3)

    integerPart = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
  }

  if (minusSign) {
    integerPart = "-" + integerPart
  }

  return decimalPart ? `${integerPart}.${decimalPart}` : integerPart
}

/**
 * Remove formatting and non-digits to get raw number
 *
 * @param formattedString {string | number}
 *
 * @returns {number} - The raw number
 */
export const removeFormatting = (formattedString: string | number): number => {
  return Number(toEnglish(formattedString).replace(/[,\s]/g, "").replace(/[^\d.-]/g, ""))
}
