import AdapterFn from '../AdapterFn'
import { crError } from '../crFn';

const { ymdToUTC } = AdapterFn
, _isArr = Array.isArray;

const _crInfo = ({ title, subtitle, items }) => ({
  name: `${title}: ${subtitle} (${items[1].c || ''})`
});

const _getCountryIndicator = ({ items=[] }) => ({
  country: items[0].v,
  indicator: items[1].v
});

const fnAdapter = {
  crError,
  getCi: _getCountryIndicator,

  crData: (json) => {
    const arrIn = json[1];
    if (!_isArr(arrIn)) {
      return [];
    }
    const d = [];
    arrIn.forEach(p => {
      if (p && p.value != null && p.date) {
        d.push({
          x: ymdToUTC(p.date),
          y: p.value
        })
      }
    })
    return d.reverse();
  },

  crConfOption: (option) => {
    const {
      _itemKey, title,
      linkItem, dataSource
    } = option;
    return {
      info: _crInfo(option),
      zhConfig: {
        key: _itemKey,
        id: _itemKey,
        itemCaption: title,
        linkFn: 'DF',
        item: { ...linkItem },
        dataSource
      }
    };
  }
};

export default fnAdapter
