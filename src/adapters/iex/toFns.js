import AdapterFn from '../AdapterFn'
import CT from './ChartType'

const _calcScatterY = (chart, isMin) => {
  const { max, min } = chart.yAxis[0]
      , all = max - min
      , one = all/100;
  return isMin
    ? (min + one)
    : (max - 7*one);
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

  crToSeria: ({ chart, seria, caption, color, option }) => {
    const { dfType } = option;
    const y = (dfType === CT.ERN)
      ? _calcScatterY(chart)
      : _calcScatterY(chart, true);
    seria.data.forEach(p => p.y = y)
    Object.assign(seria, {
      zhItemCaption: caption,
      zhColor: color
    })
    return seria;
  }
};

export default toFns
