
const _isFn = fn => typeof fn === 'function';

const getAdapter = (rAdapter, option) => {
  const { _pn='dfSubId' } = rAdapter
  , routeId = option[_pn]
  , adapter = routeId && rAdapter[routeId]
     || rAdapter.DF;
  return _isFn(adapter)
    ? adapter()
    : adapter;
};

const crAdapterRouter = (rAdapter, { isKey, crDfKey } = {}) => {
  const _getAdapter = getAdapter.bind(null, rAdapter);
  const _adapter = {
    crKey: isKey || crDfKey
      ? (option) => {
          const _crKey = _getAdapter(option).crKey
            || crDfKey;
          return _isFn(_crKey)
            ? _crKey(option)
            : void 0;
        }
      : void 0,

    toConfig: (json, option) => _getAdapter(option)
      .toConfig(json, option),

    isAdd: (option) => _isFn(_getAdapter(option).toSeries),

    toSeries: (json, option, chart) => _getAdapter(option)
      .toSeries(json, option, chart)
   };
   return _adapter;
};

export default crAdapterRouter
