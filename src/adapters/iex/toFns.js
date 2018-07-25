import AdapterFn from '../AdapterFn'

const _calcScatterY = (chart) => {
  const { max, min } = chart.yAxis[0]
      , all = max - min
      , one = all/100;
  return (max - 7*one);
};

const toFns = {
  crZhConfig: (option) => {
    const { value, dataSource } = option
        , id = AdapterFn.crId();
    return {
      id, key: id,
      itemCaption: value || id,
      isWithoutAdd: true,
      isWithLegend: false,
      dataSource
    };
  },

  crToSeria: (chart, seria, caption, color) => {
    const y = _calcScatterY(chart);
    seria.data.forEach(p => p.y = y)
    Object.assign(seria, {
      zhItemCaption: caption,
      zhColor: color
    })
    return seria;
  }
};

export default toFns
