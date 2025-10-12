import { NEPALI_DIGITS } from "@/constants"
import { toNepali } from "@/conversion"
import { removeFormatting } from "@/formatting"

/**
 * Pad with Nepali zeros
 *
 * @param number {number | string} - The number to pad
 * @param length {number} - Length for zero pad
 *
 * @returns {string} - The padded number
 */
export const padZeros = (number: number | string, length: number): string => {
  const str = number.toString()
  const zeros = (NEPALI_DIGITS[0] ?? "0").repeat(Math.max(0, length - str.length))

  return zeros + toNepali(str)
}

/**
 * Round and format with Nepali digits
 *
 * @param number {string | number} - The number to round and format
 * @param decimals {number} - Precision for rounding off
 *
 * @returns {string} - The rounded number
 */
export const roundNepali = (number: number | string, decimals: number = 2): string => {
  const factor = Math.pow(10, decimals)
  const rawNumber = removeFormatting(number)
  const rounded = Math.round(rawNumber * factor) / factor

  return toNepali(rounded.toFixed(decimals))
}
