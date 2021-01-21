import AdapterFn from '../AdapterFn'

const {
  getValue,
  crError,
  joinBy
} = AdapterFn;

const _crZhConfig = ({
  _itemKey,
  itemCaption,
  dataSource
}) => ({
  id: _itemKey, key: _itemKey,
  itemCaption,
  dataSource
});

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
    zhConfig: _crZhConfig(option)
  })
};

export default fnAdapter
