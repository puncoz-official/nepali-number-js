import { parseNepaliNumber } from "@/conversion"
import { formatNepaliNumber } from "@/formatting"
import { toNepaliWords } from "@/words"
import type { CurrencyOptions } from "./types.ts"

export const toNepaliCurrency = (amount: number | string, options: CurrencyOptions = {}): string => {
  const {
    useNepaliDigits = true,
    showPaisa = true,
    currencySymbol = "रू",
    precision = 2,
  } = options

  const formatted = formatNepaliNumber(amount, {
    ...options,
    useNepaliDigits: useNepaliDigits,
    precision: showPaisa ? precision : 0,
    trimZero: !showPaisa,
  })

  return `${currencySymbol} ${formatted}`
}

export const toNepaliCurrencyWords = (amount: number | string): string => {
  const parsedAmount = parseNepaliNumber(String(amount))

  if (parsedAmount < 0) {
    return `ऋण ${toNepaliCurrencyWords(-parsedAmount)}`
  }

  let rupees = Math.floor(parsedAmount)
  let paisa = Math.round((parsedAmount - rupees) * 100)

  if (paisa >= 100) {
    rupees += Math.floor(paisa / 100)
    paisa -= Math.floor(paisa / 100) * 100
  }

  let result = ""

  if (rupees > 0) {
    result += `${toNepaliWords(rupees)} रुपैयाँ`
  }

  if (paisa > 0) {
    if (result) {
      result += " "
    }

    result += `${toNepaliWords(paisa)} पैसा`
  }

  return result || "शून्य रुपैयाँ"
}
