import ChartConfig from '../../charts/ChartConfig';

import EuroStatFn from './EuroStatFn';


const toMap = {
  createConfig : (json, option) => {
    const timeIndex = json.dimension.time.category.index
        , value = json.value
        , { data } = EuroStatFn.createData(timeIndex, value)
        , config = ChartConfig.fBaseAreaConfig();
     
     EuroStatFn.setDataAndInfo({ config, data, json, option });

     config.zhDialog = option
     config.zhDialog.apiKey = ''
     config.json = json
     config.zhMapSlice = option.zhMapSlice

     return config;
  }
};

export default toMap
