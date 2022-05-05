import {
  getValue,
  crZhConfig,
  joinBy
} from '../AdapterFn';
import { crError } from '../crFn';

const _joinBy = joinBy.bind(null, ': ');

const fnAdapter = {
  getValue,
  crError,

  crCaption: (option, { meta }) => {
    const {
      exchange, symbol,
      type, currency
    } = meta || {};
    return {
      title: _joinBy(exchange, symbol, type, currency)
    };
  },

  crAddConfig: ({ option }) => ({
    zhConfig: crZhConfig(option)
  })
};

export default fnAdapter
