import pipe from '../../utils/pipe';

import {
  crAreaConfig,
  fAddCaption,
  fAddPointsToConfig,
  fAddMinMax,
  fAddTooltip,
  fAdd,
  toConfig
} from '../../charts/configBuilderFn';
import Builder from '../../charts/ConfigBuilder';
import {
  tooltipValueDmy
} from '../../charts/Tooltip';

import {
  crId,
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
  crKey: crId,

  toConfig(json, option){
    const _id = crId(option)
    , _title = crTitle(json, option)
    , _subtitle = crSubtitle(json, option)
    , _points = toDataPoints(json, option);

    return {
      config: pipe(
        crAreaConfig(),
        fAddCaption(_title, _subtitle),
        fAddPointsToConfig(_id, _points),
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
    const _data = crSeriaData(json, option)
    , { itemCaption } = option;
    return Builder()
      .initSeria()
      .add({
        data: _data,
        minY: findMinY(_data),
        name: itemCaption,
        itemCaption: itemCaption
      })
      .toSeria();
  }
};

export default FaoStatAdapter
