import { describe, expect, test } from "bun:test"
import { toDecimalWord, toNepaliWords } from "."

describe("Words Functions", () => {
  describe("toNepaliWords", () => {
    test("converts single digits", () => {
      expect(toNepaliWords(0)).toBe("शून्य")
      expect(toNepaliWords(1)).toBe("एक")
      expect(toNepaliWords(5)).toBe("पाँच")
      expect(toNepaliWords(9)).toBe("नौ")
    })

    test("converts teen numbers", () => {
      expect(toNepaliWords(10)).toBe("दश")
      expect(toNepaliWords(11)).toBe("एघार")
      expect(toNepaliWords(15)).toBe("पन्ध्र")
      expect(toNepaliWords(19)).toBe("उन्नाइस")
      expect(toNepaliWords(20)).toBe("बीस")
    })

    test("converts tens", () => {
      expect(toNepaliWords(21)).toBe("एक्काईस")
      expect(toNepaliWords(30)).toBe("तीस")
      expect(toNepaliWords(45)).toBe("पैंतालीस")
      expect(toNepaliWords(99)).toBe("उनान्सय")
    })

    test("converts hundreds", () => {
      expect(toNepaliWords(100)).toBe("एक सय")
      expect(toNepaliWords(101)).toBe("एक सय एक")
      expect(toNepaliWords(250)).toBe("दुई सय पचास")
      expect(toNepaliWords(999)).toBe("नौ सय उनान्सय")
    })

    test("converts thousands", () => {
      expect(toNepaliWords(1000)).toBe("एक हजार")
      expect(toNepaliWords(1001)).toBe("एक हजार एक")
      expect(toNepaliWords(2500)).toBe("दुई हजार पाँच सय")
      expect(toNepaliWords(99999)).toBe("उनान्सय हजार नौ सय उनान्सय")
    })

    test("converts lakhs", () => {
      expect(toNepaliWords(100000)).toBe("एक लाख")
      expect(toNepaliWords(150000)).toBe("एक लाख पचास हजार")
      expect(toNepaliWords(999999)).toBe("नौ लाख उनान्सय हजार नौ सय उनान्सय")
    })

    test("converts crores", () => {
      expect(toNepaliWords(10000000)).toBe("एक करोड")
      expect(toNepaliWords(12345678)).toBe("एक करोड तेईस लाख पैंतालीस हजार छ सय अठहत्तर")
    })

    test("handles negative numbers", () => {
      expect(toNepaliWords(-1)).toBe("ऋण एक")
      expect(toNepaliWords(-123)).toBe("ऋण एक सय तेईस")
      expect(toNepaliWords(-1000)).toBe("ऋण एक हजार")
    })

    test("handles edge cases", () => {
      expect(toNepaliWords(21)).toBe("एक्काईस")
      expect(toNepaliWords(101)).toBe("एक सय एक")
      expect(toNepaliWords(1001)).toBe("एक हजार एक")
    })

    test("handles very large numbers", () => {
      expect(toNepaliWords(123456789)).toBe("बाह्र करोड चौंतीस लाख छपन्न हजार सात सय उनान्नब्बे")
    })

    test("handles boundary values", () => {
      expect(toNepaliWords(20)).toBe("बीस")
      expect(toNepaliWords(100)).toBe("एक सय")
      expect(toNepaliWords(1000)).toBe("एक हजार")
      expect(toNepaliWords(100000)).toBe("एक लाख")
      expect(toNepaliWords(10000000)).toBe("एक करोड")
    })
  })

  // describe("toEnglishWords", () => {
  //   test("converts single digits", () => {
  //     expect(toEnglishWords(0)).toBe("zero")
  //     expect(toEnglishWords(1)).toBe("one")
  //     expect(toEnglishWords(5)).toBe("five")
  //     expect(toEnglishWords(9)).toBe("nine")
  //   })
  //
  //   test("converts teen numbers", () => {
  //     expect(toEnglishWords(10)).toBe("ten")
  //     expect(toEnglishWords(11)).toBe("eleven")
  //     expect(toEnglishWords(15)).toBe("fifteen")
  //     expect(toEnglishWords(19)).toBe("nineteen")
  //   })
  //
  //   test("converts tens", () => {
  //     expect(toEnglishWords(20)).toBe("twenty")
  //     expect(toEnglishWords(21)).toBe("twenty one")
  //     expect(toEnglishWords(30)).toBe("thirty")
  //     expect(toEnglishWords(99)).toBe("ninety nine")
  //   })
  //
  //   test("converts hundreds", () => {
  //     expect(toEnglishWords(100)).toBe("one hundred")
  //     expect(toEnglishWords(101)).toBe("one hundred one")
  //     expect(toEnglishWords(250)).toBe("two hundred fifty")
  //     expect(toEnglishWords(999)).toBe("nine hundred ninety nine")
  //   })
  //
  //   test("converts thousands", () => {
  //     expect(toEnglishWords(1000)).toBe("one thousand")
  //     expect(toEnglishWords(1001)).toBe("one thousand one")
  //     expect(toEnglishWords(2500)).toBe("two thousand five hundred")
  //   })
  //
  //   test("handles negative numbers", () => {
  //     expect(toEnglishWords(-1)).toBe("negative one")
  //     expect(toEnglishWords(-123)).toBe("negative one hundred twenty three")
  //   })
  //
  //   test("handles very large numbers fallback", () => {
  //     expect(toEnglishWords(1234567890)).toBe("1234567890")
  //   })
  //
  //   test("handles edge cases", () => {
  //     expect(toEnglishWords(11)).toBe("eleven")
  //     expect(toEnglishWords(12)).toBe("twelve")
  //     expect(toEnglishWords(13)).toBe("thirteen")
  //   })
  // })
  //
  // describe("toNepaliOrdinal", () => {
  //   test("formats basic ordinals", () => {
  //     expect(toNepaliOrdinal(1)).toBe("पहिलो")
  //     expect(toNepaliOrdinal(2)).toBe("दोस्रो")
  //     expect(toNepaliOrdinal(3)).toBe("तेस्रो")
  //     expect(toNepaliOrdinal(4)).toBe("चौथो")
  //     expect(toNepaliOrdinal(5)).toBe("पाँचौं")
  //     expect(toNepaliOrdinal(10)).toBe("दशौं")
  //   })
  //
  //   test("formats larger ordinals", () => {
  //     expect(toNepaliOrdinal(11)).toBe("एघारौं")
  //     expect(toNepaliOrdinal(21)).toBe("बीस एकौं")
  //     expect(toNepaliOrdinal(100)).toBe("एक सयौं")
  //   })
  //
  //   test("handles edge cases", () => {
  //     expect(toNepaliOrdinal(0)).toBe("शून्यौं")
  //     expect(toNepaliOrdinal(25)).toBe("बीस पाँचौं")
  //     expect(toNepaliOrdinal(101)).toBe("एक सय एकौं")
  //   })
  //
  //   test("handles negative numbers", () => {
  //     expect(toNepaliOrdinal(-1)).toBe("ऋण एकौं")
  //     expect(toNepaliOrdinal(-5)).toBe("ऋण पाँचौं")
  //   })
  // })

  describe("toDecimalWord", () => {
    test("converts to decimal words", () => {
      expect(toDecimalWord(10000000)).toBe("१ करोड")
      expect(toDecimalWord(15000000)).toBe("१.५० करोड")
      expect(toDecimalWord(20000000)).toBe("२ करोड")
    })

    test("handles numbers less than 1 crore", () => {
      expect(toDecimalWord(5000000)).toBe("५० लाख")
      expect(toDecimalWord(500000)).toBe("५ लाख")
      expect(toDecimalWord(50000)).toBe("५० हजार")
    })

    test("handles multiple crores", () => {
      expect(toDecimalWord(50000000)).toBe("५ करोड")
      expect(toDecimalWord(123456789)).toBe("१२.३५ करोड")
    })

    test("handles exact crore multiples", () => {
      expect(toDecimalWord(30000000)).toBe("३ करोड")
      expect(toDecimalWord(100000000)).toBe("१० करोड")
    })

    test("handles zero and small numbers", () => {
      expect(toDecimalWord(0)).toBe("०")
      expect(toDecimalWord(1)).toBe("१")
      expect(toDecimalWord(10)).toBe("१०")
      expect(toDecimalWord(99)).toBe("९९")
      expect(toDecimalWord(100)).toBe("१ सय")
      expect(toDecimalWord(1000)).toBe("१ हजार")
    })
  })
})
