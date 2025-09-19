import { describe, expect, test } from "bun:test"
import { addNepaliCommas, formatNepaliNumber, padZeros, removeFormatting, roundNepali } from "."

describe("Formatting Functions", () => {
  describe("addNepaliCommas", () => {
    test("adds commas for thousands", () => {
      expect(addNepaliCommas("1234")).toBe("1,234")
      expect(addNepaliCommas("12345")).toBe("12,345")
    })

    test("uses Indian numbering system", () => {
      expect(addNepaliCommas("1234567")).toBe("12,34,567")
      expect(addNepaliCommas("12345678")).toBe("1,23,45,678")
      expect(addNepaliCommas("123456789")).toBe("12,34,56,789")
    })

    test("handles decimal numbers", () => {
      expect(addNepaliCommas("1234.56")).toBe("1,234.56")
      expect(addNepaliCommas("1234567.89")).toBe("12,34,567.89")
    })

    test("handles small numbers", () => {
      expect(addNepaliCommas("123")).toBe("123")
      expect(addNepaliCommas("12")).toBe("12")
      expect(addNepaliCommas("1")).toBe("1")
    })

    test("handles edge cases", () => {
      expect(addNepaliCommas("")).toBe("")
      expect(addNepaliCommas("0")).toBe("0")
      expect(addNepaliCommas("100")).toBe("100")
      expect(addNepaliCommas("1000")).toBe("1,000")
    })

    test("handles very long numbers", () => {
      const longNumber = "123456789012345"
      expect(addNepaliCommas(longNumber)).toBe("12,34,56,78,90,12,345")
    })

    test("preserves decimal precision", () => {
      expect(addNepaliCommas("1234567.123456789")).toBe("12,34,567.123456789")
      expect(addNepaliCommas("123.000")).toBe("123.000")
    })

    test("handles negative numbers", () => {
      expect(formatNepaliNumber(-123.45)).toBe("-१२३.४५")
      expect(formatNepaliNumber(-1234567.89)).toBe("-१२,३४,५६७.८९")
    })
  })

  describe("formatNepaliNumber", () => {
    test("formats basic numbers", () => {
      expect(formatNepaliNumber(123)).toBe("१२३")
      expect(formatNepaliNumber(1234.56)).toBe("१,२३४.५६")
      expect(formatNepaliNumber(0)).toBe("०")
    })

    test("respects useNepaliDigits option", () => {
      expect(formatNepaliNumber(123, { useNepaliDigits: false })).toBe("123")
      expect(formatNepaliNumber(1234.56, { useNepaliDigits: false })).toBe("1,234.56")
    })

    test("respects addCommas option", () => {
      expect(formatNepaliNumber(1234, { addCommas: false })).toBe("१२३४")
      expect(formatNepaliNumber(1234567, { addCommas: false })).toBe("१२३४५६७")
    })

    test("handles precision option", () => {
      expect(formatNepaliNumber(123.456, { precision: 2 })).toBe("१२३.४६")
      expect(formatNepaliNumber(123.456, { precision: 0 })).toBe("१२३")
      expect(formatNepaliNumber(123.456, { precision: 4 })).toBe("१२३.४५६")
    })

    test("handles showZero option", () => {
      expect(formatNepaliNumber(0, { showZero: false })).toBe("")
      expect(formatNepaliNumber(0, { showZero: true })).toBe("०")
    })

    test("handles string input", () => {
      expect(formatNepaliNumber("123")).toBe("१२३")
      expect(formatNepaliNumber("१२३४.५६")).toBe("१,२३४.५६")
    })

    test("handles invalid input", () => {
      expect(formatNepaliNumber("abc")).toBe("०")
      expect(formatNepaliNumber("abc", { showZero: false })).toBe("")
      expect(formatNepaliNumber(NaN)).toBe("०")
    })

    test("removes trailing zeros", () => {
      expect(formatNepaliNumber(123.00)).toBe("१२३")
      expect(formatNepaliNumber(123.10)).toBe("१२३.१")
      expect(formatNepaliNumber(123.50)).toBe("१२३.५")
    })

    test("handles negative numbers", () => {
      expect(formatNepaliNumber(-123.45)).toBe("-१२३.४५")
      expect(formatNepaliNumber(-1234567.89)).toBe("-१२,३४,५६७.८९")
    })

    test("handles very large numbers", () => {
      expect(formatNepaliNumber(1234567890123)).toBe("१२,३४,५६,७८,९०,१२३")
    })

    test("handles very small numbers", () => {
      expect(formatNepaliNumber(0.0001)).toBe("०")
      expect(formatNepaliNumber(0.0001, { precision: 4 })).toBe("०.०००१")
    })
  })

  describe("removeFormatting", () => {
    test("removes commas and spaces", () => {
      expect(removeFormatting("१,२३४")).toBe(1234)
      expect(removeFormatting("१२ ३४ ५६७")).toBe(1234567)
    })

    test("converts Nepali digits", () => {
      expect(removeFormatting("१२३.४५")).toBe(123.45)
      expect(removeFormatting("९,८७,६५४.३२१")).toBe(987654.321)
    })

    test("removes currency symbols", () => {
      expect(removeFormatting("रु १,२३४.५६")).toBe(1234.56)
      expect(removeFormatting("$ १२३")).toBe(123)
    })

    test("handles mixed formatting", () => {
      expect(removeFormatting("Price: रु १,२३,४५६.७८")).toBe(123456.78)
    })

    test("preserves negative sign", () => {
      expect(removeFormatting("-१,२३४.५६")).toBe(-1234.56)
    })

    test("handles empty and invalid input", () => {
      expect(removeFormatting("")).toBe(0)
      expect(removeFormatting("abc")).toBe(0)
      expect(removeFormatting("   ")).toBe(0)
    })

    test("handles already clean numbers", () => {
      expect(removeFormatting(123.45)).toBe(123.45)
      expect(removeFormatting("-67.89")).toBe(-67.89)
    })
  })

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
})
