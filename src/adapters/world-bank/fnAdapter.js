import AdapterFn from '../AdapterFn'

const {
  ymdToUTC,
  valueMoving
} = AdapterFn;

const _crInfo = ({ title, subtitle, two }) => ({
  name: `${title}: ${subtitle} (${two})`
});

const fnAdapter = {    
  crId: (option) => {
    const { one='', two='' } = option;
    return `${one}_${two}`;
  },
  crData: (arrIn) => {
    if (!Array.isArray(arrIn)) {
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

  crConfigOptions: (option, data) => {
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
      },
      valueMoving: valueMoving(data)
    };
  }
};

export default fnAdapter
