import DecimalJs from 'decimal.js';

DecimalJs.set({ precision: 128 });

class Decimal extends DecimalJs {
  static ZERO = new Decimal(0);

  toJSON(): string {
    return super.toFixed();
  }
}

export default Decimal;
