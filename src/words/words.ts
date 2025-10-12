import { ENGLISH_WORDS, NEPALI_ORDINALS, NEPALI_ORDINALS_EXCEPTIONS, NEPALI_SCALES, NEPALI_WORDS } from "@/constants.ts"
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
  const num = parseNepaliNumber(String(number))

  if (num < 0) {
    return "negative " + toEnglishWords(-num)
  }

  if (num < 10) {
    return ENGLISH_WORDS.ONES[num] || ""
  }

  if (num < 20) {
    return ENGLISH_WORDS.TEENS[num - 10] || ""
  }

  if (num < 100) {
    const tens = Math.floor(num / 10)
    const ones = num % 10

    let onesWord = ""
    if (ones !== 0) {
      onesWord = toEnglishWords(ones)
    }
    return `${ENGLISH_WORDS.TENS[tens - 2]} ${onesWord}`.trim()
  }

  for (let scale of NEPALI_SCALES) {
    if (num >= scale.value) {
      const remainder = num % scale.value

      let remainderWord = ""
      if (remainder > 0) {
        remainderWord = toEnglishWords(remainder)
      }

      return `${toEnglishWords(Math.floor(num / scale.value))} ${scale.label_en} ${remainderWord}`.trim()
    }
  }

  return String(number)
}

const _toNepaliOrdinal = (number: number, withException: boolean = true): string => {
  if (number < 0) {
    return "ऋण " + _toNepaliOrdinal(-number, false)
  }

  if (number < 5 && withException) {
    return (NEPALI_ORDINALS_EXCEPTIONS[number] || "").trim()
  }

  if (number < 100) {
    return (NEPALI_ORDINALS[number] || "").trim()
  }

  for (let scale of NEPALI_SCALES) {
    if (number >= scale.value) {
      const remainder = number % scale.value

      if (remainder === 0) {
        return `${toNepaliWords(Math.floor(number / scale.value))} ${scale.label_ordinal}`.trim()
      }

      const remainderWord = _toNepaliOrdinal(remainder, false)

      return `${toNepaliWords(Math.floor(number / scale.value))} ${scale.label_np} ${remainderWord}`.trim()
    }
  }

  return String(number)
}
export const toNepaliOrdinal = (number: number | string): string => {
  return _toNepaliOrdinal(parseNepaliNumber(String(number)))
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
