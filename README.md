# nepali-number

[![NPM Version](https://img.shields.io/npm/v/nepali-number)](https://www.npmjs.com/package/nepali-number)
[![npm download (18m)](https://img.shields.io/npm/d18m/nepali-number)](https://www.npmjs.com/package/nepali-number)
[![npm bundle size](https://img.shields.io/bundlephobia/min/nepali-number)](https://bundlephobia.com/result?p=nepali-number)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/nepali-number)](https://bundlephobia.com/result?p=nepali-number)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/puncoz)](https://x.com/puncoz)

A comprehensive TypeScript/JavaScript library for converting, formatting, and working with numbers in Nepali (Devanagari) script. This package provides seamless conversion between English and Nepali digits, number formatting with Nepali locale support, number-to-words conversion, currency formatting, and various utility functions.

## Features

- 🔄 **Bidirectional Conversion**: Convert between English (0-9) and Nepali (०-९) digits
- 📊 **Nepali Number Formatting**: Format numbers using the Nepali numbering system (lakh/crore)
- 📝 **Number to Words**: Convert numbers to words in both Nepali and English
- 💰 **Currency Support**: Format currency amounts in Nepali rupees with word conversion
- 🔧 **Utility Functions**: Validation, detection, and manipulation of Nepali numbers
- 📱 **Cross-platform**: Works in browsers, Node.js, and other JavaScript environments
- 🎯 **TypeScript Support**: Full TypeScript definitions included
- 🌐 **Unicode Compliant**: Proper Unicode support for Devanagari script

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
    - [Conversion Functions](#conversion-functions)
        - [`toNepali()`](#tonepaliinput-string--number-string)
        - [`toEnglish()`](#toenglishinput-string--number-string)
        - [`parseNepaliNumber()`](#parsenepalinumbernepalinumber-string-number)
        - [`convert()`](#converttext-string-tonepalinumber-boolean-string)
    - [Formatting Functions](#formatting-functions)
        - [`formatNepaliNumber()`](#formatnepalinumbernumber-number--string-options-formatoptions-string)
        - [`addNepaliCommas()`](#addnepalicommasnumber-string--number-string)
        - [`removeFormatting()`](#removeformattingformattedstring-string--number-number)
    - [Words Conversion](#words-conversion)
        - [`toNepaliWords()`](#tonepaliwordsnumber-number--string-string)
        - [`toEnglishWords()`](#toenglishwordsnumber-number--string-string)
        - [`toNepaliOrdinal()`](#tonepaliordinalnumber-number--string-string)
        - [`toDecimalWord()`](#todecimalwordnumber-number--string-string)
    - [Currency Functions](#currency-functions)
        - [`toNepaliCurrency()`](#tonepalicurrencyamount-number--string-options-currencyoptions-string)
        - [`toNepaliCurrencyWords()`](#tonepalicurrencywordsamount-number--string-string)
    - [Utility Functions](#utility-functions)
        - [`padZeros()`](#padzerosnumber-number--string-length-number-string)
        - [`roundNepali()`](#roundnepalinumber-number--string-decimals-number-string)
        - [`isNepaliDigit()`](#isnepalidigitchar-string-boolean)
        - [`isEnglishDigit()`](#isenglishdigitchar-string-boolean)
        - [`isMixedNumber()`](#ismixednumberinput-string-boolean)
        - [`detectNumberSystem()`](#detectnumbersysteminput-string-numbersystem--typeof-nan)
        - [`validateNepaliNumber()`](#validatenepalinumberinput-string-boolean)
        - [`normalize()`](#normalizeinput-string-string)
- [TypeScript Support](#typescript-support)
- [Browser Support](#browser-support)
- [Examples](#examples)
    - [Complete Number Processing](#complete-number-processing)
    - [Working with Mixed Content](#working-with-mixed-content)
- [Contributing](#contributing)
    - [Development Setup](#development-setup)
    - [Running Tests](#running-tests)
- [License](#license)
- [Author](#author)
- [Support](#support)
- [Related Packages](#related-packages)

## Installation

Using `npm`:

```bash
npm install nepali-number
```

or, using `yarn`:

```bash
yarn add nepali-number
```

or, using `pnpm`:

```bash
pnpm add nepali-number
```

or, using `bun`:

```bash
bun add nepali-number
```

## Quick Start

```javascript
import { toNepali, toEnglish, formatNepaliNumber, toNepaliWords } from 'nepali-number'

// Convert digits
console.log(toNepali(123))        // "१२३"
console.log(toEnglish("१२३"))     // "123"

// Format numbers
console.log(formatNepaliNumber(1234567))  // "१२,३४,५६७"

// Convert to words
console.log(toNepaliWords(123))   // "एक सय तेईस"
```

## API Documentation

### Conversion Functions

#### `toNepali(input: string | number): string`

Converts English digits (0-9) to Nepali digits (०-९).

```javascript
import { toNepali } from 'nepali-number'

toNepali(123)           // "१२३"
toNepali("456.78")      // "४५६.७८"
toNepali("Rs 1000")     // "Rs १०००"
toNepali(-42)           // "-४२"
```

#### `toEnglish(input: string | number): string`

Converts Nepali digits (०-९) to English digits (0-9).

```javascript
import { toEnglish } from 'nepali-number'

toEnglish("१२३")        // "123"
toEnglish("४५६.७८")    // "456.78"
toEnglish("रू १०००")    // "रू 1000"
```

#### `parseNepaliNumber(nepaliNumber: string): number`

Parses a Nepali number string to a JavaScript number.

```javascript
import { parseNepaliNumber } from 'nepali-number'

parseNepaliNumber("१२३")      // 123
parseNepaliNumber("४५६.७८")  // 456.78
parseNepaliNumber("१,२३,४५६") // 123456
```

#### `convert(text: string, toNepaliNumber?: boolean): string`

Converts mixed content while preserving non-numeric text.

```javascript
import { convert } from 'nepali-number'

convert("Price: 123 USD", true)   // "Price: १२३ USD"
convert("मूल्य: १२३ USD", false)   // "मूल्य: 123 USD"
```

### Formatting Functions

#### `formatNepaliNumber(number: number | string, options?: FormatOptions): string`

Formats numbers with Nepali digits and locale-specific formatting.

```javascript
import { formatNepaliNumber } from 'nepali-number'

formatNepaliNumber(1234567)
// "१२,३४,५६७"

formatNepaliNumber(1234567.89, {
  useNepaliDigits: true,
  addCommas: true,
  precision: 2,
  trimZero: false
})
// "१२,३४,५६७.८९"
```

**FormatOptions:**

- `useNepaliDigits?: boolean` - Use Nepali digits (default: true)
- `addCommas?: boolean` - Add comma separators (default: true)
- `precision?: number` - Decimal precision (default: 2)
- `trimZero?: boolean` - Remove trailing zeros (default: true)

#### `addNepaliCommas(number: string | number): string`

Adds commas in Nepali (Indian) number format using the lakh/crore system.

```javascript
import { addNepaliCommas } from 'nepali-number'

addNepaliCommas(1234567)     // "12,34,567"
addNepaliCommas(12345678)    // "1,23,45,678"
```

#### `removeFormatting(formattedString: string | number): number`

Removes formatting to get the raw number.

```javascript
import { removeFormatting } from 'nepali-number'

removeFormatting("१२,३४,५६७")  // 1234567
removeFormatting("रू १,२३४")   // 1234
```

### Words Conversion

#### `toNepaliWords(number: number | string): string`

Converts numbers to Nepali words.

```javascript
import { toNepaliWords } from 'nepali-number'

toNepaliWords(123)        // "एक सय तेईस"
toNepaliWords(1000)       // "एक हजार"
toNepaliWords(100000)     // "एक लाख"
toNepaliWords(10000000)   // "एक करोड"
```

#### `toEnglishWords(number: number | string): string`

Converts numbers to English words using Nepali numbering system.

```javascript
import { toEnglishWords } from 'nepali-number'

toEnglishWords(123)       // "one hundred twenty three"
toEnglishWords(100000)    // "one lakh"
toEnglishWords(10000000)  // "one crore"
```

#### `toNepaliOrdinal(number: number | string): string`

Converts numbers to Nepali ordinal words.

```javascript
import { toNepaliOrdinal } from 'nepali-number'

toNepaliOrdinal(1)   // "पहिलो"
toNepaliOrdinal(2)   // "दोस्रो"
toNepaliOrdinal(3)   // "तेस्रो"
toNepaliOrdinal(21)  // "एक्काईसौं"
```

#### `toDecimalWord(number: number | string): string`

Converts numbers to decimal word format.

```javascript
import { toDecimalWord } from 'nepali-number'

toDecimalWord(150000)     // "१.५ लाख"
toDecimalWord(2500000)    // "२५ लाख"
toDecimalWord(15000000)   // "१.५ करोड"
```

### Currency Functions

#### `toNepaliCurrency(amount: number | string, options?: CurrencyOptions): string`

Formats currency amounts in Nepali rupees.

```javascript
import { toNepaliCurrency } from 'nepali-number'

toNepaliCurrency(1234.56)
// "रू १,२३४.५६"

toNepaliCurrency(1000, {
  useNepaliDigits: true,
  showPaisa: false,
  currencySymbol: "रू",
  precision: 2
})
// "रू १,०००"
```

**CurrencyOptions:**

- `useNepaliDigits?: boolean` - Use Nepali digits (default: true)
- `showPaisa?: boolean` - Show paisa/cents (default: true)
- `currencySymbol?: string` - Currency symbol (default: "रू")
- `precision?: number` - Decimal precision (default: 2)

#### `toNepaliCurrencyWords(amount: number | string): string`

Converts currency amounts to Nepali words.

```javascript
import { toNepaliCurrencyWords } from 'nepali-number'

toNepaliCurrencyWords(1234.56)
// "एक हजार दुई सय चौंतीस रुपैयाँ छपन्न पैसा"

toNepaliCurrencyWords(1000)
// "एक हजार रुपैयाँ"
```

### Utility Functions

#### `padZeros(number: number | string, length: number): string`

Pads numbers with Nepali zeros.

```javascript
import { padZeros } from 'nepali-number'

padZeros(42, 5)      // "०००४२"
padZeros("123", 6)   // "०००१२३"
```

#### `roundNepali(number: number | string, decimals?: number): string`

Rounds and formats numbers with Nepali digits.

```javascript
import { roundNepali } from 'nepali-number'

roundNepali(123.456, 2)   // "१२३.४६"
roundNepali(123.456, 0)   // "१२३"
```

#### `isNepaliDigit(char: string): boolean`

Checks if a character is a Nepali digit.

```javascript
import { isNepaliDigit } from 'nepali-number'

isNepaliDigit("५")   // true
isNepaliDigit("5")   // false
isNepaliDigit("a")   // false
```

#### `isEnglishDigit(char: string): boolean`

Checks if a character is an English digit.

```javascript
import { isEnglishDigit } from 'nepali-number'

isEnglishDigit("5")   // true
isEnglishDigit("५")   // false
isEnglishDigit("a")   // false
```

#### `isMixedNumber(input: string): boolean`

Checks if input contains both English and Nepali digits.

```javascript
import { isMixedNumber } from 'nepali-number'

isMixedNumber("12३४")   // true
isMixedNumber("1234")   // false
isMixedNumber("१२३४")   // false
```

#### `detectNumberSystem(input: string): NumberSystem | typeof NaN`

Detects the number system used in the input.

```javascript
import { detectNumberSystem } from 'nepali-number'

detectNumberSystem("1234")    // "english"
detectNumberSystem("१२३४")    // "nepali"
detectNumberSystem("12३४")    // "mixed"
detectNumberSystem("abcd")    // NaN
```

#### `validateNepaliNumber(input: string): boolean`

Validates if the input is a valid Nepali number.

```javascript
import { validateNepaliNumber } from 'nepali-number'

validateNepaliNumber("१२३.४५")   // true
validateNepaliNumber("१२३.४५.६") // false (multiple decimals)
validateNepaliNumber("१२३abc")   // false (contains letters)
```

#### `normalize(input: string): string`

Normalizes input by removing extra spaces and formatting.

```javascript
import { normalize } from 'nepali-number'

normalize("  १२३  ४५६  ")     // "१२३४५६"
normalize("१२३,,४५६")         // "१२३,४५६"
normalize("१२३..४५६")         // "१२३.४५६"
```

## TypeScript Support

This package is written in TypeScript and includes full type definitions. All functions are properly typed for better development experience.

```typescript
import { 
  toNepali, 
  FormatOptions, 
  CurrencyOptions, 
  NumberSystem 
} from 'nepali-number'

const options: FormatOptions = {
  useNepaliDigits: true,
  addCommas: true,
  precision: 2
}

const result: string = toNepali(123)
```

## Browser Support

This package works in all modern browsers and supports:

- ES6 modules
- CommonJS
- UMD builds
- IIFE builds for direct browser usage

```html
<!-- Direct browser usage -->
<script src="https://unpkg.com/nepali-number/dist/nepali-number.iife.js"></script>
<script>
  console.log(NepaliNumber.toNepali(123)) // "१२३"
</script>
```

## Examples

### Complete Number Processing

```javascript
import { 
  toNepali, 
  formatNepaliNumber, 
  toNepaliWords, 
  toNepaliCurrency,
  toNepaliCurrencyWords 
} from 'nepali-number'

const amount = 1234567.89

console.log('Original:', amount)
console.log('Nepali Digits:', toNepali(amount))
console.log('Formatted:', formatNepaliNumber(amount))
console.log('In Words:', toNepaliWords(amount))
console.log('Currency:', toNepaliCurrency(amount))
console.log('Currency Words:', toNepaliCurrencyWords(amount))

// Output:
// Original: 1234567.89
// Nepali Digits: १२३४५६७.८९
// Formatted: १२,३४,५६७.८९
// In Words: बाह्र लाख चौंतीस हजार पाँच सय सतसट्ठी
// Currency: रू १२,३४,५६७.८९
// Currency Words: बाह्र लाख चौंतीस हजार पाँच सय सतसट्ठी रुपैयाँ उनासी पैसा
```

### Working with Mixed Content

```javascript
import { convert, parseNepaliNumber } from 'nepali-number'

const nepaliText = "मेरो उमेर २५ वर्ष छ र मेरो तलब रू ५०,०००"
const englishText = convert(nepaliText, false)
console.log(englishText) // "मेरो उमेर 25 वर्ष छ र मेरो तलब रू 50,000"

// Extract and parse numbers
const salary = parseNepaliNumber("५०,०००")
console.log(salary) // 50000
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/puncoz-official/nepali-number-js.git

# Install dependencies
bun install

# Run tests
bun test

# Build the package
bun run build

# Development mode with watch
bun run dev
```

### Running Tests

```bash
bun test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Puncoz Nepal**

- X (formerly Twitter): [@puncoz](https://x.com/puncoz)
- GitHub: [@puncoz](https://github.com/puncoz)
- Website: [https://puncoz.com](https://puncoz.com)
- Email: <info@puncoz.com>

## Support

If you find this package helpful, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing to the codebase

## Related Packages

- [bikram-sambat-js](https://github.com/puncoz-official/bikram-sambat-js) - Utility library to convert date in AD to Nepali date BS (Bikram sambat) and vice versa.
- [nepali-datepicker-reactjs](https://github.com/puncoz-official/nepali-datepicker-reactjs) - React component for Nepali date picker (Bikram Sambat)

---

Made with ❤️ for the Nepali developer community
