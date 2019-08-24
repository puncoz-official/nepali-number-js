class NepaliNumber {
    private outputLocale: string = "en"
    private numberString: string = ""
    private supportedLocale: string[] = ["en", "ne"]
    private supportedNumberType: string[] = ["en-IN", "en-US"]
    private digitMapping: string[] = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"]

    constructor(numberString?: number) {
        if (numberString) {
            this.setNumber(numberString)
        }
    }

    public setOutputLocale(locale: string): NepaliNumber {
        if (!this.supportedLocale.includes(locale)) {
            throw new TypeError("Currently 'ne' and 'en' only supported as a `locale` parameter.")
        }

        this.outputLocale = locale

        return this
    }

    public setNumber(numberString: string | number): NepaliNumber {
        this.numberString = `${numberString}`

        return this
    }

    public toNepali(numberString?: string | number): string {
        numberString = numberString || this.numberString
        if (!numberString) {
            return ""
        }

        return numberString.toString().split("").map((char: string): string => {
            // tslint:disable-next-line:radix
            if (isNaN(parseInt(char))) {
                return char
            }

            return this.digitMapping[char] || char
        }).join("")
    }

    public toEnglish(numberString?: string): string {
        numberString = numberString || this.numberString
        if (!numberString) {
            return ""
        }

        return numberString.toString().split("").map((char: string): string => {
            const englishDigit = this.digitMapping.findIndex((digit): boolean => digit === char)

            return englishDigit === -1 ? char : `${englishDigit}`
        }).join("")
    }

    public formatNumber(type: string): string {
        if (!this.supportedNumberType.includes(type)) {
            throw new TypeError("Currently 'en-US' and 'en-IN' only supported as a `type` parameter.")
        }

        // tslint:disable-next-line:radix
        const englishNumber = parseFloat(this.toEnglish())
        if (isNaN(englishNumber)) {
            return this.numberString
        }

        const formatted = (new Intl.NumberFormat(type)).format(englishNumber)

        return this.outputLocale === "en" ? this.toEnglish(formatted) : this.toNepali(formatted)
    }

    public formatAmount(type: string, precision: number = 2): string {
        if (!this.supportedNumberType.includes(type)) {
            throw new TypeError("Currently 'en-US' and 'en-IN' only supported as a `type` parameter.")
        }

        // tslint:disable-next-line:radix
        const englishAmount = parseFloat(this.toEnglish())
        if (isNaN(englishAmount)) {
            return this.numberString
        }

        const formatted = (new Intl.NumberFormat(type, {
            maximumFractionDigits: precision,
            minimumFractionDigits: precision,
        })).format(englishAmount)

        return this.outputLocale === "en" ? this.toEnglish(formatted) : this.toNepali(formatted)
    }
}

export default NepaliNumber
