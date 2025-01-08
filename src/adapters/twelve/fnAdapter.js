import { joinBy } from '../AdapterFn';

export const crCaption = (
  option,
  { meta }
) => {
  const {
    exchange,
    symbol,
    type,
    currency
  } = meta || {};
  return {
    title: joinBy(": ", exchange, symbol, type, currency)
  };
}
