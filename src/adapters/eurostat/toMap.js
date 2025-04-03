import {
  crAreaConfig
} from '../../charts/ChartConfigFn';
import {
  crData,
  crZhConfig,
  crDatasetInfo
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
   config.series[0].data = data

   _assign(config, {
      zhDialog: option,
      json: json,
      zhMapSlice: option.zhMapSlice,
      info: crDatasetInfo(json),
      zhConfig: crZhConfig(option)
    })
    return config;
}
