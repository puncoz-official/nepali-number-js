import { describe, expect, test } from "bun:test"
import {
  detectNumberSystem,
  isEnglishDigit,
  isMixedNumber,
  isNepaliDigit,
  normalize,
  padZeros,
  roundNepali,
  validateNepaliNumber,
} from "."

describe("Utility Functions", () => {
  describe("padZeros", () => {
    test("pads with Nepali zeros", () => {
      expect(padZeros(123, 5)).toBe("००१२३")
      expect(padZeros("45", 4)).toBe("००४५")
    })

    test("handles numbers already at target length", () => {
      expect(padZeros(123, 3)).toBe("१२३")
      expect(padZeros("1234", 4)).toBe("१२३४")
    })

    test("handles numbers longer than target", () => {
      expect(padZeros(12345, 3)).toBe("१२३४५")
      expect(padZeros("123456", 4)).toBe("१२३४५६")
    })

    test("handles zero length", () => {
      expect(padZeros(123, 0)).toBe("१२३")
      expect(padZeros(5, 0)).toBe("५")
    })

    test("handles zero as input", () => {
      expect(padZeros(0, 3)).toBe("०००")
      expect(padZeros("0", 5)).toBe("०००००")
    })

    test("handles negative length", () => {
      expect(padZeros(123, -5)).toBe("१२३")
    })
  })

  describe("roundNepali", () => {
    test("rounds and formats with default decimals", () => {
      expect(roundNepali(123.456)).toBe("१२३.४६")
      expect(roundNepali(123.454)).toBe("१२३.४५")
    })

    test("respects decimal parameter", () => {
      expect(roundNepali(123.456, 0)).toBe("१२३")
      expect(roundNepali(123.456, 1)).toBe("१२३.५")
      expect(roundNepali(123.456, 3)).toBe("१२३.४५६")
    })

    test("handles negative numbers", () => {
      expect(roundNepali(-123.456)).toBe("-१२३.४६")
      expect(roundNepali(-123.454, 1)).toBe("-१२३.५")
    })

    test("handles whole numbers", () => {
      expect(roundNepali(123)).toBe("१२३.००")
      expect(roundNepali(123, 0)).toBe("१२३")
    })

    test("handles very small numbers", () => {
      expect(roundNepali(0.0001, 4)).toBe("०.०००१")
      expect(roundNepali(0.0001, 2)).toBe("०.००")
    })

    test("handles edge rounding cases", () => {
      expect(roundNepali(0.5)).toBe("०.५०")
      expect(roundNepali(1.5, 0)).toBe("२")
      expect(roundNepali(2.5, 0)).toBe("३")
    })

    test("handles nepali numbers", () => {
      expect(roundNepali("१२३.४५६")).toBe("१२३.४६")
      expect(roundNepali("१२३.४५६", 3)).toBe("१२३.४५६")
    })
  })

  describe("isNepaliDigit", () => {
    test("identifies Nepali digits correctly", () => {
      expect(isNepaliDigit("०")).toBe(true)
      expect(isNepaliDigit("१")).toBe(true)
      expect(isNepaliDigit("९")).toBe(true)
    })

    test("rejects non-Nepali digits", () => {
      expect(isNepaliDigit("0")).toBe(false)
      expect(isNepaliDigit("5")).toBe(false)
      expect(isNepaliDigit("a")).toBe(false)
      expect(isNepaliDigit(".")).toBe(false)
      expect(isNepaliDigit(" ")).toBe(false)
    })

    test("handles empty and multi-character strings", () => {
      expect(isNepaliDigit("")).toBe(false)
      expect(isNepaliDigit("१२")).toBe(true)
    })

    test("handles unicode variations", () => {
      expect(isNepaliDigit("४")).toBe(true)
      expect(isNepaliDigit("७")).toBe(true)
    })
  })

  describe("isEnglishDigit", () => {
    test("identifies English digits correctly", () => {
      expect(isEnglishDigit("0")).toBe(true)
      expect(isEnglishDigit("5")).toBe(true)
      expect(isEnglishDigit("9")).toBe(true)
    })

    test("rejects non-English digits", () => {
      expect(isEnglishDigit("०")).toBe(false)
      expect(isEnglishDigit("५")).toBe(false)
      expect(isEnglishDigit("a")).toBe(false)
      expect(isEnglishDigit(".")).toBe(false)
    })

    test("handles empty and multi-character strings", () => {
      expect(isEnglishDigit("")).toBe(false)
      expect(isEnglishDigit("12")).toBe(false)
    })
  })

  describe("isMixedNumber", () => {
    test("identifies mixed numbers", () => {
      expect(isMixedNumber("१23")).toBe(true)
      expect(isMixedNumber("12३")).toBe(true)
      expect(isMixedNumber("1२3")).toBe(true)
    })

    test("identifies pure English numbers", () => {
      expect(isMixedNumber("123")).toBe(false)
      expect(isMixedNumber("0")).toBe(false)
    })

    test("identifies pure Nepali numbers", () => {
      expect(isMixedNumber("१२३")).toBe(false)
      expect(isMixedNumber("०")).toBe(false)
    })

    test("handles non-numeric strings", () => {
      expect(isMixedNumber("abc")).toBe(false)
      expect(isMixedNumber("")).toBe(false)
      expect(isMixedNumber("hello world")).toBe(false)
    })

    test("handles complex mixed content", () => {
      expect(isMixedNumber("Price: $1२3.४5")).toBe(true)
      expect(isMixedNumber("Phone: +9७7-1-23")).toBe(true)
    })
  })

  describe("detectNumberSystem", () => {
    test("detects English number system", () => {
      expect(detectNumberSystem("123")).toBe("english")
      expect(detectNumberSystem("12.34")).toBe("english")
      expect(detectNumberSystem("Price: $123")).toBe("english")
    })

    test("detects Nepali number system", () => {
      expect(detectNumberSystem("१२३")).toBe("nepali")
      expect(detectNumberSystem("१२.३४")).toBe("nepali")
      expect(detectNumberSystem("मूल्य: रु १२३")).toBe("nepali")
    })

    test("detects mixed number system", () => {
      expect(detectNumberSystem("१23")).toBe("mixed")
      expect(detectNumberSystem("12३.४5")).toBe("mixed")
      expect(detectNumberSystem("Call 9७7-123")).toBe("mixed")
    })

    test("defaults to NaN for non-numeric content", () => {
      expect(detectNumberSystem("hello")).toBe(NaN)
      expect(detectNumberSystem("")).toBe(NaN)
      expect(detectNumberSystem("abc def")).toBe(NaN)
    })

    test("handles edge cases", () => {
      expect(detectNumberSystem("   ")).toBe(NaN)
      expect(detectNumberSystem("!@#")).toBe(NaN)
      expect(detectNumberSystem("नमस्कार")).toBe(NaN)
    })
  })

  describe("validateNepaliNumber", () => {
    test("validates correct Nepali numbers", () => {
      expect(validateNepaliNumber("१२३")).toBe(true)
      expect(validateNepaliNumber("१२३.४५")).toBe(true)
      expect(validateNepaliNumber("०")).toBe(true)
      expect(validateNepaliNumber("०.५")).toBe(true)
    })

    test("validates numbers with formatting", () => {
      expect(validateNepaliNumber("१,२३४")).toBe(true)
      expect(validateNepaliNumber("१२,३४,५६७")).toBe(true)
      expect(validateNepaliNumber("१ २३४")).toBe(true)
    })

    test("rejects invalid formats", () => {
      expect(validateNepaliNumber("123")).toBe(false) // English digits
      expect(validateNepaliNumber("१२३abc")).toBe(false) // Mixed content
      expect(validateNepaliNumber("abc१२३")).toBe(false) // Mixed content
      expect(validateNepaliNumber("१२.३.४")).toBe(false) // Multiple decimals
    })

    test("handles empty and whitespace", () => {
      expect(validateNepaliNumber("")).toBe(false)
      expect(validateNepaliNumber("   ")).toBe(false) // Only spaces, gets cleaned
    })

    test("handles edge cases", () => {
      expect(validateNepaliNumber("१२३.")).toBe(true) // Trailing decimal
      expect(validateNepaliNumber(".४५")).toBe(true) // Leading decimal
      expect(validateNepaliNumber(".")).toBe(false) // Only decimal
    })

    test("rejects multiple decimal points", () => {
      expect(validateNepaliNumber("१२.३४.५६")).toBe(false)
      expect(validateNepaliNumber("..४५")).toBe(false)
      expect(validateNepaliNumber("१२..")).toBe(false)
    })

    test("handles complex formatting", () => {
      expect(validateNepaliNumber("१, २३४ .५६")).toBe(true)
      expect(validateNepaliNumber("१,२,३,४")).toBe(true)
    })
  })

  describe("normalize", () => {
    test("trims whitespace", () => {
      expect(normalize("  १२३  ")).toBe("१२३")
      expect(normalize("\t१२३\n")).toBe("१२३")
    })

    test("removes extra spaces", () => {
      expect(normalize("१ २ ३")).toBe("१२३")
      expect(normalize("१२३   ४५६")).toBe("१२३४५६")
    })

    test("normalizes commas", () => {
      expect(normalize("१,,२३४")).toBe("१,२३४")
      expect(normalize("१,,,२३४")).toBe("१,२३४")
    })

    test("normalizes decimal points", () => {
      expect(normalize("१२३..४५")).toBe("१२३.४५")
      expect(normalize("१२३...४५")).toBe("१२३.४५")
    })

    test("handles empty input", () => {
      expect(normalize("")).toBe("")
      expect(normalize("   ")).toBe("")
    })

    test("handles complex normalization", () => {
      expect(normalize("  १, ,२३   . . ४५  ")).toBe("१,२३.४५")
    })

    test("preserves valid formatting", () => {
      expect(normalize("१,२३४.५६")).toBe("१,२३४.५६")
      expect(normalize("१२३")).toBe("१२३")
    })
  })
})
