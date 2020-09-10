import AdapterFn from '../AdapterFn'

const {
  crError,
  getFromDate,
  getCaption,
  getValue,
  joinBy,
  ymdToUTC,  
  crItemLink,
  compareByDate,
  crItemConf,
  crValueConf
} = AdapterFn;

const _isNaN = Number.isNaN || isNaN

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

const _crZhConfig = ({
  _itemKey,
  itemCaption,
  dataSource,
}) => ({
  id: _itemKey, key: _itemKey,
  itemCaption,
  dataSource
});

const _crHistZhConfig = (data, option) => ({
  ..._crZhConfig(option),
  itemConf: _crHistoricalItemConf(data, option)
});

const _crName = items => items
  .map(getCaption)
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

  crConfigOption: (option) => ({
    info: _crInfo(option),
    zhConfig: _crZhConfig(option)
  }),
  crHistOption: ({ option, data }) => ({
    info: _crInfo(option),
    zhConfig: _crHistZhConfig(data, option),
  })
};

export default fnAdapter
