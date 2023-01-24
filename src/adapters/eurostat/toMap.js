import {
  crAreaConfig
} from '../../charts/ChartConfigFn';
import {
  crData,
  setDataAndInfo
} from './EuroStatFn';

const _assign = Object.assign;

const _addItemCaptionTo = (
  option
) => {
  option.itemCaption = option.itemCaption
    || option.subtitle
};

export const crMapConfig = (
  json,
  option
) => {
   const data = crData(json)[0]
   , config = crAreaConfig();

   _addItemCaptionTo(option)
   setDataAndInfo({
      config,
      data,
      json,
      option
   });
   _assign(config, {
      zhDialog: option,
      json: json,
      zhMapSlice: option.zhMapSlice
    })
    return config;
}
