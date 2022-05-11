/**
 * Currency Conversion Utility
 * This utility function can be used for converting currency related values within metamask.
 * The caller should be able to pass it a value, along with information about the value's
 * numeric base, denomination and currency, and the desired numeric base, denomination and
 * currency. It should return a single value.
 *
 * @param {(number | string | BN)} value - The value to convert.
 * @param {Object} [options] - Options to specify details of the conversion
 * @param {string} [options.fromCurrency = 'ETH' | 'USD'] - The currency of the passed value
 * @param {string} [options.toCurrency = 'ETH' | 'USD'] - The desired currency of the result
 * @param {string} [options.fromNumericBase = 'hex' | 'dec' | 'BN'] - The numeric basic of the passed value.
 * @param {string} [options.toNumericBase = 'hex' | 'dec' | 'BN'] - The desired numeric basic of the result.
 * @param {string} [options.fromDenomination = 'WEI'] - The denomination of the passed value
 * @param {string} [options.numberOfDecimals] - The desired number of decimals in the result
 * @param {string} [options.roundDown] - The desired number of decimals to round down to
 * @param {number} [options.conversionRate] - The rate to use to make the fromCurrency -> toCurrency conversion
 * @returns {(number | string | BN)}
 *
 * The utility passes value along with the options as a single object to the `converter` function.
 * `converter` conditional modifies the supplied `value` property, depending
 * on the accompanying options.
 */

import BigNumber from 'bignumber.js';

import { stripHexPrefix, BN } from 'ethereumjs-util';

// Big Number Constants
const BIG_NUMBER_WEI_MULTIPLIER       = new BigNumber('1');
const BIG_NUMBER_KWEI_MULTIPLIER      = new BigNumber('1000');
const BIG_NUMBER_MWEI_MULTIPLIER      = new BigNumber('1000000');
const BIG_NUMBER_GWEI_MULTIPLIER      = new BigNumber('1000000000');
const BIG_NUMBER_MICRO_MULTIPLIER     = new BigNumber('1000000000000');
const BIG_NUMBER_MILLI_MULTIPLIER     = new BigNumber('1000000000000000');
const BIG_NUMBER_ETH_MULTIPLIER       = new BigNumber('1000000000000000000');
const BIG_NUMBER_KILO_MULTIPLIER      = new BigNumber('1000000000000000000000');
const BIG_NUMBER_MEGA_MULTIPLIER      = new BigNumber('1000000000000000000000000');
const BIG_NUMBER_GIGA_MULTIPLIER      = new BigNumber('1000000000000000000000000000');
const BIG_NUMBER_TERA_MULTIPLIER      = new BigNumber('1000000000000000000000000000000');

// Setter Maps
const toBigNumber = {
  hex: (n) => new BigNumber(stripHexPrefix(n), 16),
  dec: (n) => new BigNumber(String(n), 10),
  BN: (n) => new BigNumber(n.toString(16), 16),
};
const toNormalizedDenomination = {
  WEI:          (bigNumber) => bigNumber.times(BIG_NUMBER_WEI_MULTIPLIER),
  WEI10:        (bigNumber) => bigNumber.times(BIG_NUMBER_WEI_MULTIPLIER).times(10),
  WEI100:       (bigNumber) => bigNumber.times(BIG_NUMBER_WEI_MULTIPLIER).times(100),
  KWEI:         (bigNumber) => bigNumber.times(BIG_NUMBER_KWEI_MULTIPLIER),
  KWEI10:       (bigNumber) => bigNumber.times(BIG_NUMBER_KWEI_MULTIPLIER).times(10),
  KWEI100:      (bigNumber) => bigNumber.times(BIG_NUMBER_KWEI_MULTIPLIER).times(100),
  MWEI:         (bigNumber) => bigNumber.times(BIG_NUMBER_MWEI_MULTIPLIER),
  MWEI10:       (bigNumber) => bigNumber.times(BIG_NUMBER_MWEI_MULTIPLIER).times(10),
  MWEI100:      (bigNumber) => bigNumber.times(BIG_NUMBER_MWEI_MULTIPLIER).times(100),
  GWEI:         (bigNumber) => bigNumber.times(BIG_NUMBER_GWEI_MULTIPLIER),
  GWEI10:       (bigNumber) => bigNumber.times(BIG_NUMBER_GWEI_MULTIPLIER).times(10),
  GWEI100:      (bigNumber) => bigNumber.times(BIG_NUMBER_GWEI_MULTIPLIER).times(100),
  MICRO:        (bigNumber) => bigNumber.times(BIG_NUMBER_MICRO_MULTIPLIER),
  MICRO10:      (bigNumber) => bigNumber.times(BIG_NUMBER_MICRO_MULTIPLIER).times(10),
  MICRO100:     (bigNumber) => bigNumber.times(BIG_NUMBER_MICRO_MULTIPLIER).times(100),
  MILLI:        (bigNumber) => bigNumber.times(BIG_NUMBER_MILLI_MULTIPLIER),
  MILLI10:      (bigNumber) => bigNumber.times(BIG_NUMBER_MILLI_MULTIPLIER).times(10),
  MILLI100:     (bigNumber) => bigNumber.times(BIG_NUMBER_MILLI_MULTIPLIER).times(100),
  ETH:          (bigNumber) => bigNumber.times(BIG_NUMBER_ETH_MULTIPLIER),
  ETH10:        (bigNumber) => bigNumber.times(BIG_NUMBER_ETH_MULTIPLIER).times(10),
  ETH100:       (bigNumber) => bigNumber.times(BIG_NUMBER_ETH_MULTIPLIER).times(100),
  KILO:         (bigNumber) => bigNumber.times(BIG_NUMBER_KILO_MULTIPLIER),
  KILO10:       (bigNumber) => bigNumber.times(BIG_NUMBER_KILO_MULTIPLIER).times(10),
  KILO100:      (bigNumber) => bigNumber.times(BIG_NUMBER_KILO_MULTIPLIER).times(100),
  MEGA:         (bigNumber) => bigNumber.times(BIG_NUMBER_MEGA_MULTIPLIER),
  MEGA10:       (bigNumber) => bigNumber.times(BIG_NUMBER_MEGA_MULTIPLIER).times(10),
  MEGA100:      (bigNumber) => bigNumber.times(BIG_NUMBER_MEGA_MULTIPLIER).times(100),
  GIGA:         (bigNumber) => bigNumber.times(BIG_NUMBER_GIGA_MULTIPLIER),
  GIGA10:       (bigNumber) => bigNumber.times(BIG_NUMBER_GIGA_MULTIPLIER).times(10),
  GIGA100:      (bigNumber) => bigNumber.times(BIG_NUMBER_GIGA_MULTIPLIER).times(100),
  TERA:         (bigNumber) => bigNumber.times(BIG_NUMBER_TERA_MULTIPLIER),
  TERA10:       (bigNumber) => bigNumber.times(BIG_NUMBER_TERA_MULTIPLIER).times(10),
  TERA100:      (bigNumber) => bigNumber.times(BIG_NUMBER_TERA_MULTIPLIER).times(100),
};
const toSpecifiedDenomination = {
  WEI:          (bigNumber) => bigNumber.div(BIG_NUMBER_WEI_MULTIPLIER).round(),
  WEI10:        (bigNumber) => bigNumber.div(BIG_NUMBER_WEI_MULTIPLIER).div(10).round(),
  WEI100:       (bigNumber) => bigNumber.div(BIG_NUMBER_WEI_MULTIPLIER).div(100).round(),
  KWEI:         (bigNumber) => bigNumber.div(BIG_NUMBER_KWEI_MULTIPLIER).round(),
  KWEI10:       (bigNumber) => bigNumber.div(BIG_NUMBER_KWEI_MULTIPLIER).div(10).round(),
  KWEI100:      (bigNumber) => bigNumber.div(BIG_NUMBER_KWEI_MULTIPLIER).div(100).round(),
  MWEI:         (bigNumber) => bigNumber.div(BIG_NUMBER_MWEI_MULTIPLIER).round(),
  MWEI10:       (bigNumber) => bigNumber.div(BIG_NUMBER_MWEI_MULTIPLIER).div(10).round(),
  MWEI100:      (bigNumber) => bigNumber.div(BIG_NUMBER_MWEI_MULTIPLIER).div(100).round(),
  GWEI:         (bigNumber) => bigNumber.div(BIG_NUMBER_GWEI_MULTIPLIER).round().round(9),
  GWEI10:       (bigNumber) => bigNumber.div(BIG_NUMBER_GWEI_MULTIPLIER).div(10).round(9),
  GWEI100:      (bigNumber) => bigNumber.div(BIG_NUMBER_GWEI_MULTIPLIER).div(100).round(9),
  MICRO:        (bigNumber) => bigNumber.div(BIG_NUMBER_MICRO_MULTIPLIER).round().round(9),
  MICRO10:      (bigNumber) => bigNumber.div(BIG_NUMBER_MICRO_MULTIPLIER).div(10).round(9),
  MICRO100:     (bigNumber) => bigNumber.div(BIG_NUMBER_MICRO_MULTIPLIER).div(100).round(9),
  MILLI:        (bigNumber) => bigNumber.div(BIG_NUMBER_MILLI_MULTIPLIER).round().round(9),
  MILLI10:      (bigNumber) => bigNumber.div(BIG_NUMBER_MILLI_MULTIPLIER).div(10).round(9),
  MILLI100:     (bigNumber) => bigNumber.div(BIG_NUMBER_MILLI_MULTIPLIER).div(100).round(9),
  ETH:          (bigNumber) => bigNumber.div(BIG_NUMBER_ETH_MULTIPLIER).round(9),
  ETH10:        (bigNumber) => bigNumber.div(BIG_NUMBER_ETH_MULTIPLIER).div(10).round(9),
  ETH100:       (bigNumber) => bigNumber.div(BIG_NUMBER_ETH_MULTIPLIER).div(100).round(9),
  KILO:         (bigNumber) => bigNumber.div(BIG_NUMBER_KILO_MULTIPLIER).round(9),
  KILO10:       (bigNumber) => bigNumber.div(BIG_NUMBER_KILO_MULTIPLIER).div(10).round(9),
  KILO100:      (bigNumber) => bigNumber.div(BIG_NUMBER_KILO_MULTIPLIER).div(100).round(9),
  MEGA:         (bigNumber) => bigNumber.div(BIG_NUMBER_MEGA_MULTIPLIER).round(9),
  MEGA10:       (bigNumber) => bigNumber.div(BIG_NUMBER_MEGA_MULTIPLIER).div(10).round(9),
  MEGA100:      (bigNumber) => bigNumber.div(BIG_NUMBER_MEGA_MULTIPLIER).div(100).round(9),
  GIGA:         (bigNumber) => bigNumber.div(BIG_NUMBER_GIGA_MULTIPLIER).round(9),
  GIGA10:       (bigNumber) => bigNumber.div(BIG_NUMBER_GIGA_MULTIPLIER).div(10).round(9),
  GIGA100:      (bigNumber) => bigNumber.div(BIG_NUMBER_GIGA_MULTIPLIER).div(100).round(9),
  TERA:         (bigNumber) => bigNumber.div(BIG_NUMBER_TERA_MULTIPLIER).round(9),
  TERA10:       (bigNumber) => bigNumber.div(BIG_NUMBER_TERA_MULTIPLIER).div(10).round(9),
  TERA100:      (bigNumber) => bigNumber.div(BIG_NUMBER_TERA_MULTIPLIER).div(100).round(9),
};
const baseChange = {
  hex: (n) => n.toString(16),
  dec: (n) => new BigNumber(n).toString(10),
  BN: (n) => new BN(n.toString(16)),
};

const toNormalizedDecimals = {
  0: "WEI",
  1: "WEI10",
  2: "WEI100",
  3: "KWEI",
  4: "KWEI10",
  5: "KWEI100",
  6: "MWEI",
  7: "MWEI10",
  8: "MWEI100",
  9: "GWEI",
  10: "GWEI10",
  11: "GWEI100",
  12: "MICRO",
  13: "MICRO10",
  14: "MICRO100",
  15: "MILLI",
  16: "MILLI10",
  17: "MILLI100",
  18: "ETH",
  19: "ETH10",
  20: "ETH100",
  21: "KILO", 
  22: "KILO10",
  23: "KILO100",
  24: "MEGA",
  25: "MEGA10",
  26: "MEGA100",
  27: "GIGA",
  28: "GIGA10",
  29: "GIGA100",
  30: "TERA",
  31: "TERA10",
  32: "TERA100",
}

const validUnit = (unit) => {
  switch(string.toLower(unit)){
    case "wei":
      return "WEI";
    case "kwei", "babbage", "femtoether":
      return "KWEI";
    case "mwei", "lovelace", "picoether":
      return "MWEI";
    case "gwei", "shannon", "nanoether", "nano":
      return "GWEI";
    case "micro", "microether", "szabo":
      return "MICRO";
    case "milli", "milliether", "finney":
      return "MILLI";
    case "ether", "eth":
      return "ETH";
    case "kether", "grand", "kilo", "kiloether":
      return "KILO";
    case "mether", "mega":
      return "MEGA";
    case "gether", "giga":
      return "GIGA";
    case "tether", "tera":
      return "TERA";
  }
  throw new Error('Unknown valid base unit');
}

// Utility function for checking base types
const isValidBase = (base) => {
  return Number.isInteger(base) && base > 1;
};

/**
 * Defines the base type of numeric value
 *
 * @typedef {('hex' | 'dec' | 'BN')} NumericBase
 */

/**
 * Defines which type of denomination a value is in
 *
 * @typedef {('WEI' | 'GWEI' | 'ETH')} EthDenomination
 */

/**
 * Utility method to convert a value between denominations, formats and currencies.
 *
 * @param {Object} input
 * @param {string | BigNumber} input.value
 * @param {NumericBase} input.fromNumericBase
 * @param {EthDenomination} [input.fromDenomination]
 * @param {string} [input.fromCurrency]
 * @param {NumericBase} input.toNumericBase
 * @param {EthDenomination} [input.toDenomination]
 * @param {string} [input.toCurrency]
 * @param {number} [input.numberOfDecimals]
 * @param {number} [input.conversionRate]
 * @param {boolean} [input.invertConversionRate]
 * @param {string} [input.roundDown]
 */
const converter = ({
  value,
  fromNumericBase,
  fromDenomination,
  fromCurrency,
  toNumericBase,
  toDenomination,
  toCurrency,
  numberOfDecimals,
  conversionRate,
  invertConversionRate,
  roundDown,
}) => {
  let convertedValue = fromNumericBase
    ? toBigNumber[fromNumericBase](value)
    : value;

  if (fromDenomination) {
    convertedValue = toNormalizedDenomination[fromDenomination](convertedValue);
  }

  if (fromCurrency !== toCurrency) {
    if (conversionRate === null || conversionRate === undefined) {
      throw new Error(
        `Converting from ${fromCurrency} to ${toCurrency} requires a conversionRate, but one was not provided`,
      );
    }
    let rate = toBigNumber.dec(conversionRate);
    if (invertConversionRate) {
      rate = new BigNumber(1.0).div(conversionRate);
    }
    convertedValue = convertedValue.div(BIG_NUMBER_ETH_MULTIPLIER).times(rate); // Currently, it is WEI, so the conversion rate is calculated based on ETH.
    if (toDenomination) { // If toCurrency is the local currency, toDenomination will most likely be undefined.
      convertedValue = convertedValue.times(BIG_NUMBER_ETH_MULTIPLIER);  // Convert back to WEI if there is toDenomination value
    }
  }

  if (toDenomination) {
    convertedValue = toSpecifiedDenomination[toDenomination](convertedValue);
  }

  if (numberOfDecimals !== undefined && numberOfDecimals !== null) {
    convertedValue = convertedValue.round(
      numberOfDecimals,
      BigNumber.ROUND_HALF_DOWN,
    );
  }

  if (roundDown) {
    convertedValue = convertedValue.round(roundDown, BigNumber.ROUND_DOWN);
  }

  if (toNumericBase) {
    convertedValue = baseChange[toNumericBase](convertedValue);
  }
  return convertedValue;
};

const conversionUtil = (
  value,
  {
    fromCurrency = null,
    toCurrency = fromCurrency,
    fromNumericBase,
    toNumericBase,
    fromDenomination,
    toDenomination,
    numberOfDecimals,
    conversionRate,
    invertConversionRate,
  },
) => {
  if (fromCurrency !== toCurrency && !conversionRate) {
    return 0;
  }
  return converter({
    fromCurrency,
    toCurrency,
    fromNumericBase,
    toNumericBase,
    fromDenomination,
    toDenomination,
    numberOfDecimals,
    conversionRate,
    invertConversionRate,
    value: value || '0',
  });
};

const getBigNumber = (value, base) => {
  if (!isValidBase(base)) {
    throw new Error('Must specify valid base');
  }

  // We don't include 'number' here, because BigNumber will throw if passed
  // a number primitive it considers unsafe.
  if (typeof value === 'string' || value instanceof BigNumber) {
    return new BigNumber(value, base);
  }

  return new BigNumber(String(value), base);
};

const addCurrencies = (a, b, options = {}) => {
  const { aBase, bBase, ...conversionOptions } = options;

  if (!isValidBase(aBase) || !isValidBase(bBase)) {
    throw new Error('Must specify valid aBase and bBase');
  }

  const value = getBigNumber(a, aBase).add(getBigNumber(b, bBase));

  return converter({
    value,
    ...conversionOptions,
  });
};

const subtractCurrencies = (a, b, options = {}) => {
  const { aBase, bBase, ...conversionOptions } = options;

  if (!isValidBase(aBase) || !isValidBase(bBase)) {
    throw new Error('Must specify valid aBase and bBase');
  }

  const value = getBigNumber(a, aBase).minus(getBigNumber(b, bBase));

  return converter({
    value,
    ...conversionOptions,
  });
};

const multiplyCurrencies = (a, b, options = {}) => {
  const { multiplicandBase, multiplierBase, ...conversionOptions } = options;

  if (!isValidBase(multiplicandBase) || !isValidBase(multiplierBase)) {
    throw new Error('Must specify valid multiplicandBase and multiplierBase');
  }

  const value = getBigNumber(a, multiplicandBase).times(
    getBigNumber(b, multiplierBase),
  );

  return converter({
    value,
    ...conversionOptions,
  });
};

const divideCurrencies = (a, b, options = {}) => {
  const { dividendBase, divisorBase, ...conversionOptions } = options;

  if (!isValidBase(dividendBase) || !isValidBase(divisorBase)) {
    throw new Error('Must specify valid dividendBase and divisorBase');
  }

  const value = getBigNumber(a, dividendBase).div(getBigNumber(b, divisorBase));

  return converter({
    value,
    ...conversionOptions,
  });
};

const conversionGreaterThan = ({ ...firstProps }, { ...secondProps }) => {
  const firstValue = converter({ ...firstProps });
  const secondValue = converter({ ...secondProps });

  return firstValue.gt(secondValue);
};

const conversionLessThan = ({ ...firstProps }, { ...secondProps }) => {
  const firstValue = converter({ ...firstProps });
  const secondValue = converter({ ...secondProps });

  return firstValue.lt(secondValue);
};

const conversionMax = ({ ...firstProps }, { ...secondProps }) => {
  const firstIsGreater = conversionGreaterThan(
    { ...firstProps },
    { ...secondProps },
  );

  return firstIsGreater ? firstProps.value : secondProps.value;
};

const conversionGTE = ({ ...firstProps }, { ...secondProps }) => {
  const firstValue = converter({ ...firstProps });
  const secondValue = converter({ ...secondProps });
  return firstValue.greaterThanOrEqualTo(secondValue);
};

const conversionLTE = ({ ...firstProps }, { ...secondProps }) => {
  const firstValue = converter({ ...firstProps });
  const secondValue = converter({ ...secondProps });
  return firstValue.lessThanOrEqualTo(secondValue);
};

const toNegative = (n, options = {}) => {
  return multiplyCurrencies(n, -1, options);
};

function decGWEIToHexWEI(decGWEI) {
  return conversionUtil(decGWEI, {
    fromNumericBase: 'dec',
    toNumericBase: 'hex',
    fromDenomination: 'GWEI',
    toDenomination: 'WEI',
  });
}

export {
  conversionUtil,
  addCurrencies,
  multiplyCurrencies,
  conversionGreaterThan,
  conversionLessThan,
  conversionGTE,
  conversionLTE,
  conversionMax,
  toNegative,
  subtractCurrencies,
  decGWEIToHexWEI,
  toBigNumber,
  toNormalizedDenomination,
  divideCurrencies,
  toNormalizedDecimals,
  validUnit,
};
