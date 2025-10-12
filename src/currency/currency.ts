import { formatNepaliNumber } from "@/formatting"
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
