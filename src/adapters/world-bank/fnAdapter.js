import AdapterFn from '../AdapterFn'

const { ymdToUTC, valueMoving } = AdapterFn;

const fnAdapter = {
  crId: (option) => {
    const { one='', two='' } = option;
    return `${one}_${two}`;
  },
  crData: (arrIn) => {
    if (!Array.isArray(arrIn)) {
      return [];
    }
    const d = [], max = arrIn.length;
    let i = 1, p;
    for(;i<max;i++){
      p = arrIn[i]
      if (p.value != null) {
        d.push({
          x: ymdToUTC(p.date),
          y: p.value
        })
      }
    }
    return d.reverse();
  },

  crConfigOptions: (option, data) => {
    const { title, dataSource } = option
        , _id = fnAdapter.crId(option);
    return {
      zhConfig: {
        key: _id,
        id: _id,
        itemCaption: title,
        isWithoutAdd: true,
        dataSource
      },
      valueMoving: valueMoving(data)
    };
  }
};

export default fnAdapter
