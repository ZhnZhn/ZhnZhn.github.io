import AdapterFn from '../AdapterFn'

const {
  crError,
  getFromDate,
  getCaption,
  getValue,
  joinBy,
  ymdToUTC,
  valueMoving,
  crItemLink,
  compareByDate,
  crItemConf,
  crValueConf,
  crSeria
} = AdapterFn;

const _isNaN = Number.isNaN || isNaN

const _isHistorical = dfPn => dfPn === 'historical';
const _crHistoricalItemConf = (data, option) => {
  const {
    itemCaption, dataSource,
    items, dfT, dfPn
  } = option;
  return {
    ...crItemConf(option),
    ...crValueConf(data),
    _itemKey: 'FMP/' + itemCaption,
    dataSource,
    items, dfT, dfPn
  };
}

const _crZhConfig = (data, option) => {
  const {
    _itemKey,
    itemCaption,
    dataSource,
    dfPn
  } = option
  , itemConf = _isHistorical(dfPn)
      ? _crHistoricalItemConf(data, option)
      : void 0;
  return {
    id: _itemKey, key: _itemKey,
    itemCaption,
    itemConf,
    dataSource
  }
};

const _crName = items => items
  .map(item => item.caption)
  .join(': ');
const _crDescription = crItemLink
  .bind(null, 'Financial Modeling Prep');

const _crInfo = ({ items, _itemUrl }) => ({
  name: _crName(items),
  description: _crDescription(_itemUrl)
});

const fnAdapter = {
  crError,
  getFromDate,
  getCaption,
  getValue,
  crSeria,

  crData: (metrics, propName) => {
    const _data = [];
    metrics.forEach(item => {
      const _v = parseFloat(item[propName]);
      if (!_isNaN(_v)) {
        _data.push([ymdToUTC(item.date), _v])
      }
    })
    return _data.reverse().sort(compareByDate);
  },

  crCaption: ({ items }) => ({
    title: getCaption(items[0]),
    subtitle: joinBy(': ',
       getCaption(items[1]),
       getCaption(items[2])
    )
  }),

  crConfigOption: ({ json, option, data }) => ({
    zhConfig: _crZhConfig(data, option),
    valueMoving: valueMoving(data),
    info: _crInfo(option)
  })
};

export default fnAdapter
