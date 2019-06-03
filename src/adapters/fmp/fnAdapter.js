import AdapterFn from '../AdapterFn'

const {
  crError,
  ymdToUTC,
  valueMoving,
  crItemLink
} = AdapterFn;

const _crZhConfig = ({
  _itemKey,
  _symbol, _propName,
  dataSource
}) => ({
  id: _itemKey, key: _itemKey,
  itemCaption: _symbol+'_'+_propName,
  isWithoutAdd: true,
  dataSource
});

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
  getCaption: _fGetByPropName('caption'),
  getValue: _fGetByPropName('value'),

  crData: (metrics, propName) => {
    return metrics.map(item => ({
      x: ymdToUTC(item.date),
      y: parseFloat(item[propName])
    })).reverse();
  },

  crCaption: ({ items }) => ({
    title: fnAdapter.getCaption(items[0]),
    subtitle: fnAdapter.getCaption(items[1]) + ': ' + fnAdapter.getCaption(items[2])
  }),
  crSeriaType: seriaType => seriaType === 'COLUMN'
    ? 'column'
    : 'spline',

  crConfigOption: ({ json, option, data }) => ({
    zhConfig: _crZhConfig(option),
    valueMoving: valueMoving(data),
    info: _crInfo(option)
  })
};

export default fnAdapter
