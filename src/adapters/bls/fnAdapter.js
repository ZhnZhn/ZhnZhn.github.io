
import AdapterFn from '../AdapterFn'

const {
  ymdToUTC,
  joinBy
} = AdapterFn;

const _crZhConfig = ({
  itemCaption,
  dataSource, dfTitle,
  value,
  linkItem
}) => ({
  id: value, key: value,
  item: { ...linkItem },
  linkFn: 'DF',
  itemCaption,
  dataSource: joinBy(": ", dataSource, dfTitle)
});

const _crInfo = ({ itemCaption }) => ({
  name: itemCaption
});

const fnAdapter = {
  crTitle: ({ dfTitle, item={}, subtitle }) => dfTitle
    ? joinBy(', ', dfTitle, item.t)
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

  crConfigOption: (option) => ({
    zhConfig: _crZhConfig(option),
    info: _crInfo(option)
  })

};

export default fnAdapter
