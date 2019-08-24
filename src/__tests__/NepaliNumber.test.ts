import {
    englishAmountFormat,
    englishNumberFormat,
    englishToNepaliNumber,
    nepaliAmountFormat,
    nepaliNumberFormat,
    nepaliToEnglishNumber,
} from "../index"

test("1. English number to nepali (Devnagari) unicode", () => {
    expect(englishToNepaliNumber("12,34,56,789.01")).toBe("१२,३४,५६,७८९.०१")
})

test("2. Nepali (Devnagari) unicode to english", () => {
    expect(nepaliToEnglishNumber("१२,३४,५६,७८९.०१")).toBe("12,34,56,789.01")
})

test("3. Formatting number to Nepali number system", () => {
    expect(nepaliNumberFormat("१२३४५६७८९")).toBe("12,34,56,789")
    expect(nepaliNumberFormat("१२३४५६७८९", "ne")).toBe("१२,३४,५६,७८९")

    expect(nepaliNumberFormat("123456789")).toBe("12,34,56,789")
    expect(nepaliNumberFormat("123456789", "ne")).toBe("१२,३४,५६,७८९")
})

test("4. Formatting number to English number system", () => {
    expect(englishNumberFormat("१२३४५६७८९")).toBe("123,456,789")
    expect(englishNumberFormat("१२३४५६७८९", "ne")).toBe("१२३,४५६,७८९")

    expect(englishNumberFormat("123456789")).toBe("123,456,789")
    expect(englishNumberFormat("123456789", "ne")).toBe("१२३,४५६,७८९")
})

test("5. Formatting amount (number with precision) to Nepali number system", () => {
    expect(nepaliAmountFormat("१२३४५६७८९.०१५४")).toBe("12,34,56,789.02")
    expect(nepaliAmountFormat("१२३४५६७८९.०१५४", 3, "ne")).toBe("१२,३४,५६,७८९.०१५")

    expect(nepaliAmountFormat("123456789.0154")).toBe("12,34,56,789.02")
    expect(nepaliAmountFormat("123456789.0154", 3, "ne")).toBe("१२,३४,५६,७८९.०१५")
})

test("6. Formatting amount (number with precision) to English number system", () => {
    expect(englishAmountFormat("१२३४५६७८९.०१५४")).toBe("123,456,789.02")
    expect(englishAmountFormat("१२३४५६७८९.०१५४", 3, "ne")).toBe("१२३,४५६,७८९.०१५")

    expect(englishAmountFormat("123456789.0154")).toBe("123,456,789.02")
    expect(englishAmountFormat("123456789.0154", 3, "ne")).toBe("१२३,४५६,७८९.०१५")
})
