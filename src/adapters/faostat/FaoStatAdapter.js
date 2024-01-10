import pipe from '../../utils/pipe';

import {
  crAreaConfig,
  fAddCaption,
  fAddPointsToConfig,
  fAddMinMax,
  fAddTooltip,
  fAdd,
  toConfig,
  crSeriaConfig
} from '../../charts/configBuilderFn';
import {
  tooltipValueDmy
} from '../../charts/Tooltip';

import {
  crDfItemKey,
  crSubtitle,
  crTitle,
  toDataPoints,
  crZhConfig,
  toInfo,
  crValueMoving,
  crSeriaData,
  findMinY
} from './fnAdapter';

const FaoStatAdapter = {
  crKey: crDfItemKey,

  toConfig(json, option){
    const _id = crDfItemKey(option)
    , _title = crTitle(json, option)
    , _subtitle = crSubtitle(json, option)
    , _points = toDataPoints(json, option);

    return {
      config: pipe(
        crAreaConfig(),
        fAddCaption(_title, _subtitle),
        fAddPointsToConfig(_points),
        fAddMinMax(_points, option),
        fAddTooltip(tooltipValueDmy),
        fAdd({
          info: toInfo(json, _title, _subtitle),
          valueMoving: crValueMoving(_points),
          zhConfig: crZhConfig(_id, option)
        }),
        toConfig
      )
    };
  },

  toSeries(json, option){
    const { data } = json
    , _data = crSeriaData(data, option)
    , { itemCaption } = option;
    return pipe(
      crSeriaConfig(),
      fAdd({
        data: _data,
        minY: findMinY(_data),
        name: itemCaption,
        itemCaption
      })
    );
  }
};

export default FaoStatAdapter
