import AdapterFn from '../AdapterFn'

const {
  crError,
  getFromDate,
  ymdToUTC,
  valueMoving,
  crItemLink,
  compareByDate,
  crItemConf,
  crValueConf
} = AdapterFn;

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

const _fGetByPropName = propName => obj => obj && obj[propName] || '';

const fnAdapter = {
  crError,
  getFromDate,
  getCaption: _fGetByPropName('caption'),
  getValue: _fGetByPropName('value'),

  crData: (metrics, propName) => {
    return metrics.map(item => ([
      ymdToUTC(item.date),
      parseFloat(item[propName])
    ])).reverse().sort(compareByDate);
  },

  crCaption: ({ items }) => ({
    title: fnAdapter.getCaption(items[0]),
    subtitle: items[1]
      ? fnAdapter.getCaption(items[1]) + ': ' + fnAdapter.getCaption(items[2])
      : ''
  }),
  crSeriaType: seriaType => seriaType === 'COLUMN'
    ? 'column'
    : 'spline',

  crConfigOption: ({ json, option, data }) => ({
    zhConfig: _crZhConfig(data, option),
    valueMoving: valueMoving(data),
    info: _crInfo(option)
  })
};

export default fnAdapter
