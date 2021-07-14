
import AdapterFn from '../AdapterFn'

const {
  ymdToUTC,
  joinBy,
  crError
} = AdapterFn;

const _crZhConfig = ({
  _itemKey,
  itemCaption,
  dataSource, dfTitle,
  linkItem
}) => ({
  id: _itemKey, key: _itemKey,
  item: { ...linkItem },
  linkFn: 'DF',
  itemCaption,
  dataSource: joinBy(": ", dataSource, dfTitle)
});

const _crInfo = ({ itemCaption }) => ({
  name: itemCaption
});

const fnAdapter = {
  crError,
  crTitle: ({ dfTitle, items=[], subtitle }) => dfTitle
    ? joinBy(', ', dfTitle, items[0].t)
    : subtitle,

  crData: (json) => {
    const data = json.Results.series[0].data
       , _data = [];
    data.forEach(p => {
      const { year, period='', value } = p
          , _m = parseInt((''+period).replace('M',''), 10)
      if (typeof _m === 'number' && _m>0 && _m<13) {
        _data.push({
           x: ymdToUTC(`${year}-${_m}`),
           y: parseFloat(value)
        });
      }
    })
    return _data.reverse();
  },

  crConfOption: (option) => ({
    zhConfig: _crZhConfig(option),
    info: _crInfo(option)
  })

};

export default fnAdapter
