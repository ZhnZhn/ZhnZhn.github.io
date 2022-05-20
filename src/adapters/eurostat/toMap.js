import {
  crAreaConfig
} from '../../charts/ChartConfigFn';
import {
  crData,
  setDataAndInfo
} from './EuroStatFn';

const _assign = Object.assign

const _addItemCaptionTo = (
  option
) => {
  const {
    itemCaption,
    subtitle
  } = option;
  option.itemCaption = itemCaption || subtitle
};

const toMap = {
  createConfig: (json, option) => {
    const { data } = crData(json)
    , config = crAreaConfig();

     _addItemCaptionTo(option)
     setDataAndInfo({ config, data, json, option });
     _assign(config, {
       zhDialog: option,
       json: json,
       zhMapSlice: option.zhMapSlice
     })
     return config;
  }
};

export default toMap
