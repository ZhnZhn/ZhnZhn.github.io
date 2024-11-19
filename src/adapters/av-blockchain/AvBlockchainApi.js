import {
  fAvApi,
  crFunctionQuery
} from '../av/AvFn';
import {
  assign,
  getValue
} from '../AdapterFn';

const _crQuery = (
  option
) => {
  const { items } = option
  , symbol = getValue(items[0])
  , market = getValue(items[1]);
  assign(option, {
    itemCaption: `${symbol}/${market}`
  })
  return `${crFunctionQuery('DIGITAL_CURRENCY_DAILY')}&symbol=${symbol}&market=${market}`;
};

const AvBlockchainApi = fAvApi(() => _crQuery)

export default AvBlockchainApi
