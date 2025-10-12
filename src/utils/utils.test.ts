import { describe, expect, test } from "bun:test"
import { padZeros, roundNepali } from "."

describe("Formatting Functions", () => {
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
