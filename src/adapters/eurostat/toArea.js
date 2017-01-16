import ChartConfig from '../../charts/ChartConfig';

import EuroStatFn from './EuroStatFn';


const toArea = {
   createConfig : (json, option) => {
     const timeIndex = json.dimension.time.category.index
         , value = json.value
         //, { data, max, min } = _fnCreateData(timeIndex, value)
         , { data, max, min } = EuroStatFn.createData(timeIndex, value)
         , config = ChartConfig.fBaseAreaConfig();

      EuroStatFn.setDataAndInfo({ config, data, json, option });
      EuroStatFn.setLineExtrems({ config, max, min });

      return config;
   },
   createSeria : (json, option) => {
     const timeIndex = json.dimension.time.category.index
         , value = json.value
         , valueText = option.itemCaption
         , seria = ChartConfig.fSeries()
         , { data } = EuroStatFn.createData(timeIndex, value)
         //, { data } = _fnCreateData(timeIndex, value);

     seria.zhSeriaId = option.key;
     seria.zhValueText = valueText;
     seria.data = data

     seria.minY = EuroStatFn.findMinY(data);

     return seria;
   }
};

export default toArea
