import { NEPALI_DIGITS } from "@/constants"
import { toNepali } from "@/conversion"
import { removeFormatting } from "@/formatting"
import type { NumberSystem } from "@/utils/types"

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

export const isNepaliDigit = (char: string): boolean => {
  if (!char) {
    return false
  }

  return NEPALI_DIGITS.includes(char)
}

export const isEnglishDigit = (char: string): boolean => {
  if (!char) {
    return false
  }
  const number = parseInt(char)

  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(number)
}

export const isMixedNumber = (input: string): boolean => {
  const hasEnglish = /[0-9]/.test(input)
  const hasNepali = /[०-९]/.test(input)

  return hasEnglish && hasNepali
}

export const detectNumberSystem = (input: string): NumberSystem | typeof NaN => {
  const hasEnglish = /[0-9]/.test(input)
  const hasNepali = /[०-९]/.test(input)

  if (hasEnglish && hasNepali) {
    return "mixed"
  }

  if (hasNepali) {
    return "nepali"
  }

  if (hasEnglish) {
    return "english"
  }

  return NaN // default
}

export const validateNepaliNumber = (input: string): boolean => {
  // Remove commas and spaces for validation
  const cleaned = input.replace(/[,\s]/g, "")

  // Check if it contains only valid characters (Nepali digits, decimal point)
  const validPattern = /^[०-९]*\.?[०-९]*$/

  if (!validPattern.test(cleaned)) {
    return false
  }

  if (!cleaned || cleaned === ".") {
    return false
  }

  // Check for multiple decimal points
  const decimalCount = (cleaned.match(/\./g) || []).length
  return decimalCount <= 1
}

export const normalize = (input: string): string => {
  return input
    .trim()
    .replace(/\s+/g, "")
    .replace(/,+/g, ",")
    .replace(/\.+/g, ".")
}
