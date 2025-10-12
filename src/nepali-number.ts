import { toNepaliCurrency } from "@/currency"

export * from "@/conversion"
export * from "@/formatting"
export * from "@/words"
export * from "@/currency"

console.log(toNepaliCurrency(100.999, { precision: 1 }))
