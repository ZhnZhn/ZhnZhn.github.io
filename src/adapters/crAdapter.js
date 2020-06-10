
const _isFn = fn => typeof fn === 'function';

const crAdapter = (getAdapter, { isKey } = {}) => ({
    crKey: isKey
      ? (option) => getAdapter(option).crKey(option)
      : void 0,

    toConfig: (json, option) => getAdapter(option)
      .toConfig(json, option),

    isAdd: (option) => _isFn(getAdapter(option).toSeries),

    toSeries: (json, option) => getAdapter(option)
      .toSeries(json, option)
});

export default crAdapter
