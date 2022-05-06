export { getValue } from '../AdapterFn';
export { crError } from '../crFn';

import {
  crZhConfig,
  joinBy
} from '../AdapterFn';

const _joinBy = joinBy.bind(null, ': ');

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
    title: _joinBy(exchange, symbol, type, currency)
  };
}

export const crAddConfig = ({
  option
}) => ({
  zhConfig: crZhConfig(option)
})
