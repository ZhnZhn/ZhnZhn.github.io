import ChartConfig from '../charts/ChartConfig';
import EuroStatFn from './EuroStatFn';

const _fnCreateData = function(timeIndex, value){
  const data = [];
  let max = Number.NEGATIVE_INFINITY
    , min = Number.POSITIVE_INFINITY;

  Object.keys(timeIndex).map((key) => {
     const pointValue = value[timeIndex[key]];
     if ( !(pointValue == null) ){
       data.push([
          EuroStatFn.convertToUTC(key),
          pointValue
        ]);

        if (pointValue>=max) { max = pointValue; }
        if (pointValue<=min) { min = pointValue; }
     }
  })
    
  return { data, max, min }
}

const EuroStatAdapter = {
  toConfig(json, option){
    const timeIndex = json.dimension.time.category.index
        , value = json.value
        , { data, max, min } = _fnCreateData(timeIndex, value)
        , config = ChartConfig.fBaseAreaConfig();

   EuroStatFn.setDataAndInfo({ config, data, json, option });
   EuroStatFn.setLineExtrems({ config, max, min });

   return { config };
 },

  toSeries(json, option){
    const timeIndex = json.dimension.time.category.index
        , value = json.value
        , valueText = option.itemCaption
        , seria = ChartConfig.fSeries()
        , { data } = _fnCreateData(timeIndex, value);

    seria.zhSeriaId = option.key;
    seria.zhValueText = valueText;
    seria.data = data

    seria.minY = EuroStatFn.findMinY(data);

    return seria;
  }
}

export default EuroStatAdapter
