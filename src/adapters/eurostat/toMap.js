import ChartConfig from '../../charts/ChartConfig';

import EuroStatFn from './EuroStatFn';

const {
  createData,
  setDataAndInfo
} = EuroStatFn

const _addItemCaptionTo = (option) => {
  const { itemCaption, subtitle } = option;
  option.itemCaption = itemCaption || subtitle
};

const toMap = {
  createConfig : (json, option) => {
    const timeIndex = json.dimension.time.category.index
    , value = json.value
    , { data } = createData(timeIndex, value)
    , config = ChartConfig.crAreaConfig();

     _addItemCaptionTo(option)
     setDataAndInfo({ config, data, json, option });
     Object.assign(config, {
       zhDialog: option,
       json: json,
       zhMapSlice: option.zhMapSlice
     })
     return config;
  }
};

export default toMap
