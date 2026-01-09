import { formatNumber } from './formatNumberFn';

let LOCALE;

const _getLocale = () => LOCALE || (
 LOCALE = Array.isArray(navigator.languages)
   ? navigator.languages[0]
   : navigator.language || 'en', LOCALE);

const _crCurrencyFormatter = ({
  currency='USD',
  ...restProps
}={}) => ({
  _f: new Intl.NumberFormat(_getLocale(), {
     style: 'currency',
     currency,
     ...restProps
  }),
  format: function(number) {
    return number == null
      ? this._f.format(0)
      : this._f.format(number);
  }
})

const crCurrencyFormatter = (options) => {
  return Intl && Intl.NumberFormat
    ? _crCurrencyFormatter(options)
    : { format: formatNumber };
};

export default crCurrencyFormatter
