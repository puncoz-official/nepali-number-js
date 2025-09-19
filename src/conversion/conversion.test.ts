import { describe, expect, test } from "bun:test"
import { convertMixed, parseNepaliNumber, toEnglish, toNepali } from "."

describe("Conversion Functions", () => {
  describe("toNepali", () => {
    test("converts basic English digits to Nepali", () => {
      expect(toNepali(123)).toBe("१२३")
      expect(toNepali("456")).toBe("४५६")
      expect(toNepali(0)).toBe("०")
      expect(toNepali("0")).toBe("०")
    })

    test("handles decimal numbers", () => {
      expect(toNepali("12.34")).toBe("१२.३४")
      expect(toNepali("0.5")).toBe("०.५")
      expect(toNepali("123.456")).toBe("१२३.४५६")
      expect(toNepali(3.14159)).toBe("३.१४१५९")
    })

    test("handles negative numbers", () => {
      expect(toNepali("-123")).toBe("-१२३")
      expect(toNepali(-456)).toBe("-४५६")
      expect(toNepali("-0.5")).toBe("-०.५")
    })

    test("preserves non-digit characters", () => {
      expect(toNepali("Rs 100")).toBe("Rs १००")
      expect(toNepali("12:34:56")).toBe("१२:३४:५६")
      expect(toNepali("Date: 2024-01-15")).toBe("Date: २०२४-०१-१५")
      expect(toNepali("Phone: +977-1-234567")).toBe("Phone: +९७७-१-२३४५६७")
      expect(toNepali("8848m")).toBe("८८४८m")
      expect(toNepali("12,34,56,789.01")).toBe("१२,३४,५६,७८९.०१")
    })

    test("handles empty and special inputs", () => {
      expect(toNepali("")).toBe("")
      expect(toNepali("   ")).toBe("   ")
      expect(toNepali("abc")).toBe("abc")
      expect(toNepali("!@#$%^&*()")).toBe("!@#$%^&*()")
    })

    test("handles scientific notation", () => {
      expect(toNepali("1.23e+5")).toBe("१.२३e+५")
      expect(toNepali("4.56E-3")).toBe("४.५६E-३")
    })

    test("handles very large numbers", () => {
      const largeNumber = "123456789012345678901234567890"
      const expected = "१२३४५६७८९०१२३४५६७८९०१२३४५६७८९०"
      expect(toNepali(largeNumber)).toBe(expected)
    })

    test("preserves nepali-digits", () => {
      expect(toNepali("१२३")).toBe("१२३")
      expect(toNepali("१२45३")).toBe("१२४५३")
    })
  })

  describe("toEnglish", () => {
    test("converts basic Nepali digits to English", () => {
      expect(toEnglish("१२३")).toBe("123")
      expect(toEnglish("०")).toBe("0")
    })

    test("handles decimal numbers", () => {
      expect(toEnglish("१२.३४")).toBe("12.34")
      expect(toEnglish("०.५")).toBe("0.5")
      expect(toEnglish("१२३.४५६")).toBe("123.456")
    })

    test("handles negative numbers", () => {
      expect(toEnglish("-१२३")).toBe("-123")
      expect(toEnglish("-०.५")).toBe("-0.5")
    })

    test("preserves non-digit characters", () => {
      expect(toEnglish("Rs १००")).toBe("Rs 100")
      expect(toEnglish("समय: १२:३४:५६")).toBe("समय: 12:34:56")
      expect(toEnglish("फोन: +९७७-१-२३४५६७")).toBe("फोन: +977-1-234567")
      expect(toEnglish("८८४८m")).toBe("8848m")
      expect(toEnglish("१२,३४,५६,७८९.०१")).toBe("12,34,56,789.01")
    })

    test("handles mixed content", () => {
      expect(toEnglish("१२३ items, ४५६ total")).toBe("123 items, 456 total")
      expect(toEnglish("Price: रु २५०.७५")).toBe("Price: रु 250.75")
    })

    test("handles empty and special inputs", () => {
      expect(toEnglish("")).toBe("")
      expect(toEnglish("   ")).toBe("   ")
      expect(toEnglish("abc")).toBe("abc")
      expect(toEnglish("!@#$%^&*()")).toBe("!@#$%^&*()")
    })

    test("preserves english-digits", () => {
      expect(toEnglish("123")).toBe("123")
      expect(toEnglish("१२45३")).toBe("12453")
    })
  })

  describe("parseNepaliNumber", () => {
    test("parses basic Nepali numbers", () => {
      expect(parseNepaliNumber("१२३")).toBe(123)
      expect(parseNepaliNumber("०")).toBe(0)
      expect(parseNepaliNumber("९९९")).toBe(999)
    })

    test("parses decimal numbers", () => {
      expect(parseNepaliNumber("१२.३४")).toBe(12.34)
      expect(parseNepaliNumber("०.५")).toBe(0.5)
      expect(parseNepaliNumber("१२३.४५६")).toBe(123.456)
    })

    test("parses numbers with commas", () => {
      expect(parseNepaliNumber("१,२३४")).toBe(1234)
      expect(parseNepaliNumber("१२,३४,५६७")).toBe(1234567)
      expect(parseNepaliNumber("१,२३,४५,६७८.९०")).toBe(12345678.90)
    })

    test("handles negative numbers", () => {
      expect(parseNepaliNumber("-१२३")).toBe(-123)
      expect(parseNepaliNumber("-१२.३४")).toBe(-12.34)
    })

    test("handles whitespace", () => {
      expect(parseNepaliNumber(" १२३ ")).toBe(123)
      expect(parseNepaliNumber("१ २३")).toBe(123)
      expect(parseNepaliNumber("१२ ३४")).toBe(1234)
    })

    test("returns 0 for invalid inputs", () => {
      expect(parseNepaliNumber("")).toBe(0)
      expect(parseNepaliNumber("abc")).toBe(0)
      expect(parseNepaliNumber("१२३abc")).toBe(123)
      expect(parseNepaliNumber("invalid")).toBe(0)
      expect(parseNepaliNumber("   ")).toBe(0)
    })

    test("handles edge cases", () => {
      expect(parseNepaliNumber("०.०")).toBe(0)
      expect(parseNepaliNumber("००१")).toBe(1)
      expect(parseNepaliNumber("१२३.")).toBe(123)
      expect(parseNepaliNumber(".५")).toBe(0.5)
    })

    test("handles very large numbers", () => {
      const largeNepali = "९९९९९९९९९९९९९"
      expect(parseNepaliNumber(largeNepali)).toBe(9999999999999)
    })
  })

  describe("convertMixed", () => {
    test("converts mixed content to Nepali by default", () => {
      expect(convertMixed("Call 123-456-7890")).toBe("Call १२३-४५६-७८९०")
      expect(convertMixed("Price: $12.34")).toBe("Price: $१२.३४")
    })

    test("converts mixed content to English when specified", () => {
      expect(convertMixed("फोन १२३-४५६-७८९०", false)).toBe("फोन 123-456-7890")
      expect(convertMixed("मूल्य: $१२.३४", false)).toBe("मूल्य: $12.34")
    })

    test("handles empty strings", () => {
      expect(convertMixed("")).toBe("")
      expect(convertMixed("", false)).toBe("")
    })

    test("preserves text without numbers", () => {
      expect(convertMixed("Hello World")).toBe("Hello World")
      expect(convertMixed("नमस्कार संसार", false)).toBe("नमस्कार संसार")
    })

    test("handles complex mixed content", () => {
      const mixed = "Order #123: 45 items @ $67.89 each, total: $3055.05"
      const nepali = "Order #१२३: ४५ items @ $६७.८९ each, total: $३०५५.०५"
      expect(convertMixed(mixed)).toBe(nepali)
      expect(convertMixed(nepali, false)).toBe(mixed)
    })
  })
})

