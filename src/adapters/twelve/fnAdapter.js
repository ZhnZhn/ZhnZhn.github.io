import { joinByColon } from '../../utils/arrFn';

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
    title: joinByColon(exchange, symbol, type, currency)
  };
}
