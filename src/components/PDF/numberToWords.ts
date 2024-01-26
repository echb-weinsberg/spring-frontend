export class NumberToWordsGerman {
  private static readonly TENS: Record<number, string> = {
    2: 'zwanzig',
    3: 'dreißig',
    4: 'vierzig',
    5: 'fünfzig',
    6: 'sechzig',
    7: 'siebzig',
    8: 'achtzig',
    9: 'neunzig',
  };

  private static readonly SINGLES: Record<number, string> = {
    0: '',
    1: 'ein',
    2: 'zwei',
    3: 'drei',
    4: 'vier',
    5: 'fünf',
    6: 'sechs',
    7: 'sieben',
    8: 'acht',
    9: 'neun',
    10: 'zehn',
    11: 'elf',
    12: 'zwölf',
    13: 'dreizehn',
    14: 'vierzehn',
    15: 'fünfzehn',
    16: 'sechzehn',
    17: 'siebzehn',
    18: 'achtzehn',
    19: 'neunzehn',
  };

  private static readonly BLANK: string = ' ';
  private static readonly JOIN: string = 'und';
  private static readonly ZERO: string = 'null';
  private static readonly NEGATIVE: string = 'minus';
  private static readonly SUFFIX_ONE_SINGULAR: string = 's';
  private static readonly SUFFIX_ONE_MILLION: string = 'e';

  private getSuffixByExponent(length: number): string {
    switch (length) {
      case 2:
        return 'hundert';
      case 3:
      case 4:
      case 5:
        return 'tausend';
      case 6:
      case 7:
      case 8:
        return 'Millionen';
      case 9:
      case 10:
      case 11:
        return 'Milliarden';
      case 12:
      case 13:
      case 14:
        return 'Billionen';
      case 15:
      case 16:
      case 17:
        return 'Billiarden';
      default:
        return '';
    }
  }

  private internalNumberToWord(number: number): string {
    if (number < 20) {
      return (
        NumberToWordsGerman.SINGLES[number] +
        (number === 1 ? NumberToWordsGerman.SUFFIX_ONE_SINGULAR : '')
      );
    }
    const exponent = Math.floor(Math.log10(number));
    if (exponent < 2) {
      if (number % 10 === 0) {
        return NumberToWordsGerman.TENS[Math.floor(number / 10)];
      }
      return (
        NumberToWordsGerman.SINGLES[number % 10] +
        NumberToWordsGerman.JOIN +
        NumberToWordsGerman.TENS[Math.floor(number / 10)]
      );
    }
    let blank = '';
    if (exponent >= 6) {
      blank = NumberToWordsGerman.BLANK;
    }
    let tensPower = 0;
    if (exponent > 2) {
      tensPower = 10 ** (exponent - (exponent % 3));
    } else {
      tensPower = 10 ** exponent;
    }
    const n = Math.floor(number / tensPower);
    const k =
      n === 1
        ? NumberToWordsGerman.SINGLES[n] +
          (exponent >= 6 ? NumberToWordsGerman.SUFFIX_ONE_MILLION : '')
        : this.internalNumberToWord(n);
    return (
      k +
      blank +
      this.getSuffixByExponent(exponent) +
      blank +
      this.internalNumberToWord(number % tensPower)
    );
  }

  numberToWord(number: number): string {
    if (number === 0) {
      return NumberToWordsGerman.ZERO;
    }
    if (number === 1) {
      return NumberToWordsGerman.SINGLES[number] + NumberToWordsGerman.SUFFIX_ONE_SINGULAR;
    }

    return (
      (number < 0 ? NumberToWordsGerman.NEGATIVE + NumberToWordsGerman.BLANK : '') +
      this.internalNumberToWord(Math.abs(Math.floor(number)))
    ).trim();
  }
}
