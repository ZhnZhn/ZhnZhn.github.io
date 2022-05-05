import AdapterFn from '../AdapterFn'
import { crHm, crError } from '../crFn';

const {
  ymdToUTC,
  getYear,
  getCurrentYear,
  joinBy
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
  crHm,
  crError,
  getYear,
  getCurrentYear,

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
