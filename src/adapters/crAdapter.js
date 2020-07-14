
const _isFn = fn => typeof fn === 'function';

const crAdapter = (getAdapter, { isKey, crDfKey } = {}) => ({
    crKey: isKey || crDfKey
      ? (option) => {
          const _crKey = getAdapter(option).crKey
            || crDfKey;
          return _isFn(_crKey)
            ? _crKey(option)
            : void 0;
        }
      : void 0,

    toConfig: (json, option) => getAdapter(option)
      .toConfig(json, option),

    isAdd: (option) => _isFn(getAdapter(option).toSeries),

    toSeries: (json, option, chart) => getAdapter(option)
      .toSeries(json, option, chart)
});

export default crAdapter
