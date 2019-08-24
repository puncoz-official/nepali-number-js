import NepaliNumber from "./NepaliNumber"

export const englishToNepaliNumber = (numberString: string | number): string =>
    new NepaliNumber().setNumber(numberString).toNepali()

export const nepaliToEnglishNumber = (numberString: string): string =>
    new NepaliNumber().setNumber(numberString).toEnglish()

export const nepaliNumberFormat = (numberString: string | number, locale: string = "en") =>
    new NepaliNumber()
        .setOutputLocale(locale)
        .setNumber(numberString)
        .formatNumber("en-IN")
export const englishNumberFormat = (numberString: string | number, locale: string = "en") =>
    new NepaliNumber()
        .setOutputLocale(locale)
        .setNumber(numberString)
        .formatNumber("en-US")

export const nepaliAmountFormat = (numberString: string | number, precision: number = 2, locale: string = "en") =>
    new NepaliNumber()
        .setOutputLocale(locale)
        .setNumber(numberString)
        .formatAmount("en-IN", precision)
export const englishAmountFormat = (numberString: string | number, precision: number = 2, locale: string = "en") =>
    new NepaliNumber()
        .setOutputLocale(locale)
        .setNumber(numberString)
        .formatAmount("en-US", precision)
