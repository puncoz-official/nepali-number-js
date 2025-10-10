import { NEPALI_SCALES, NEPALI_WORDS } from "@/constants.ts"
import { parseNepaliNumber } from "@/conversion"
import { formatNepaliNumber, roundNepali } from "@/formatting"

export const toNepaliWords = (number: number | string): string => {
  const num = parseNepaliNumber(String(number))

  if (num < 0) {
    return "ऋण " + toNepaliWords(-num)
  }

  if (num < 100) {
    return NEPALI_WORDS[num] || ""
  }

  for (let scale of NEPALI_SCALES) {
    if (num >= scale.value) {
      const remainder = num % scale.value

      let remainderWord = ""
      if (remainder > 0) {
        remainderWord = toNepaliWords(remainder)
      }

      return `${toNepaliWords(Math.floor(num / scale.value))} ${scale.label_np} ${remainderWord}`.trim()
    }
  }


  return String(number)
}

export const toEnglishWords = (number: number | string): string => {
  return String(number)
}

export const toNepaliOrdinal = (number: number | string): string => {
  return String(number)
}

export const toDecimalWord = (number: number | string): string => {
  const num = parseNepaliNumber(String(number))

  for (let scale of NEPALI_SCALES) {
    if (num >= scale.value) {
      const remainder = num % scale.value

      if (remainder === 0) {
        return `${formatNepaliNumber(num / scale.value)} ${scale.label_np}`
      }

      return `${roundNepali(num / scale.value)} ${scale.label_np}`
    }
  }

  return formatNepaliNumber(num)
}
