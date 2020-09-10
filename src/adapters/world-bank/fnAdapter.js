import AdapterFn from '../AdapterFn'

const { ymdToUTC } = AdapterFn
, _isArr = Array.isArray

const _crInfo = ({ title, subtitle, two }) => ({
  name: `${title}: ${subtitle} (${two})`
});

const fnAdapter = {
  crId: (option) => {
    const { one, two } = option;
    return `${one || ''}_${two || ''}`;
  },
  crData: (arrIn) => {
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

  crConfigOptions: (option) => {
    const { title, linkItem, dataSource } = option
    , _id = fnAdapter.crId(option);
    return {
      info: _crInfo(option),
      zhConfig: {
        key: _id,
        id: _id,
        itemCaption: title,
        linkFn: 'DF',
        item: { ...linkItem },
        dataSource
      }
    };
  }
};

export default fnAdapter
