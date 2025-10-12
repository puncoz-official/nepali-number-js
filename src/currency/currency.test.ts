import { describe, expect, test } from "bun:test"
import { toNepaliCurrency } from "."

describe("Currency Functions", () => {
  describe("toNepaliCurrency", () => {
    test("formats basic currency", () => {
      expect(toNepaliCurrency(100)).toBe("रू १००.००")
      expect(toNepaliCurrency(1234.56)).toBe("रू १,२३४.५६")
    })

    test("respects useNepaliDigits option", () => {
      expect(toNepaliCurrency(100, { useNepaliDigits: false })).toBe("रू 100.00")
      expect(toNepaliCurrency(1234.56, { useNepaliDigits: false })).toBe("रू 1,234.56")
    })

    test("respects showPaisa option", () => {
      expect(toNepaliCurrency(100, { showPaisa: false })).toBe("रू १००")
      expect(toNepaliCurrency(100.50, { showPaisa: false })).toBe("रू १०१")
      expect(toNepaliCurrency(100.50, { showPaisa: true })).toBe("रू १००.५०")
    })

    test("respects custom currency symbol", () => {
      expect(toNepaliCurrency(100, { currencySymbol: "NPR" })).toBe("NPR १००.००")
      expect(toNepaliCurrency(100, { currencySymbol: "$" })).toBe("$ १००.००")
    })

    test("handles zero amount", () => {
      expect(toNepaliCurrency(0)).toBe("रू ०.००")
      expect(toNepaliCurrency(0, { showPaisa: false })).toBe("रू ०")
    })

    test("handles negative amounts", () => {
      expect(toNepaliCurrency(-100)).toBe("रू -१००.००")
      expect(toNepaliCurrency(-1234.56)).toBe("रू -१,२३४.५६")
    })

    test("handles precision option", () => {
      expect(toNepaliCurrency(100.123, { precision: 3 })).toBe("रू १००.१२३")
      expect(toNepaliCurrency(100.999, { precision: 0 })).toBe("रू १०१")
      expect(toNepaliCurrency(100.999, { precision: 1 })).toBe("रू १०१.०")
    })

    test("handles very large amounts", () => {
      expect(toNepaliCurrency(12345678.90)).toBe("रू १,२३,४५,६७८.९०")
    })

    test("handles very small amounts", () => {
      expect(toNepaliCurrency(0.01)).toBe("रू ०.०१")
      expect(toNepaliCurrency(0.001, { precision: 3 })).toBe("रू ०.००१")
    })

    test("formats with default settings", () => {
      expect(toNepaliCurrency(100)).toBe("रू १००.००")
      expect(toNepaliCurrency(1234.56)).toBe("रू १,२३४.५६")
    })

    test("handles zero", () => {
      expect(toNepaliCurrency(0)).toBe("रू ०.००")
    })

    test("handles negative amounts", () => {
      expect(toNepaliCurrency(-500.25)).toBe("रू -५००.२५")
    })

    test("handles large amounts", () => {
      expect(toNepaliCurrency(1000000)).toBe("रू १०,००,०००.००")
    })

    test("handles decimal precision", () => {
      expect(toNepaliCurrency(100.1)).toBe("रू १००.१०")
      expect(toNepaliCurrency(100.99)).toBe("रू १००.९९")
    })

    test("removes trailing zeros appropriately", () => {
      expect(toNepaliCurrency(100.00, {showPaisa: false})).toBe("रू १००")
      expect(toNepaliCurrency(100.50, {precision: 1})).toBe("रू १००.५")
    })
  })
  //
  // describe("convertCurrencyWords", () => {
  //   test("converts basic amounts to words", () => {
  //     expect(convertCurrencyWords(1)).toBe("एक रुपैयाँ")
  //     expect(convertCurrencyWords(5)).toBe("पाँच रुपैयाँ")
  //     expect(convertCurrencyWords(100)).toBe("एक सय रुपैयाँ")
  //   })
  //
  //   test("handles paisa correctly", () => {
  //     expect(convertCurrencyWords(0.50)).toBe("पचास पैसा")
  //     expect(convertCurrencyWords(0.25)).toBe("बीस पाँच पैसा")
  //     expect(convertCurrencyWords(0.01)).toBe("एक पैसा")
  //   })
  //
  //   test("handles rupees and paisa together", () => {
  //     expect(convertCurrencyWords(1.50)).toBe("एक रुपैयाँ पचास पैसा")
  //     expect(convertCurrencyWords(125.75)).toBe("एक सय बीस पाँच रुपैयाँ पचहत्तर पैसा")
  //     expect(convertCurrencyWords(5.05)).toBe("पाँच रुपैयाँ पाँच पैसा")
  //   })
  //
  //   test("handles zero amount", () => {
  //     expect(convertCurrencyWords(0)).toBe("शून्य रुपैयाँ")
  //     expect(convertCurrencyWords(0.00)).toBe("शून्य रुपैयाँ")
  //   })
  //
  //   test("handles large amounts", () => {
  //     expect(convertCurrencyWords(1000)).toBe("एक हजार रुपैयाँ")
  //     expect(convertCurrencyWords(100000)).toBe("एक लाख रुपैयाँ")
  //     expect(convertCurrencyWords(10000000)).toBe("एक करोड रुपैयाँ")
  //   })
  //
  //   test("handles decimal precision edge cases", () => {
  //     expect(convertCurrencyWords(1.999)).toBe("दुई रुपैयाँ")
  //     expect(convertCurrencyWords(1.001)).toBe("एक रुपैयाँ")
  //     expect(convertCurrencyWords(1.995)).toBe("दुई रुपैयाँ")
  //   })
  //
  //   test("handles negative amounts", () => {
  //     expect(convertCurrencyWords(-100)).toBe("ऋण एक सय रुपैयाँ")
  //     expect(convertCurrencyWords(-1.50)).toBe("ऋण एक रुपैयाँ पचास पैसा")
  //   })
  //
  //   test("handles fractional paisa correctly", () => {
  //     expect(convertCurrencyWords(1.234)).toBe("एक रुपैयाँ तेइस पैसा")
  //     expect(convertCurrencyWords(1.678)).toBe("एक रुपैयाँ अठसठी पैसा")
  //   })
  // })
})
