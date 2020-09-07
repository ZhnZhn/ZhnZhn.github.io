
import Builder from '../../charts/ConfigBuilder'
import Tooltip from '../../charts/Tooltip'

import fnAdapter from './fnAdapter'

const {
  crId, crSubtitle, crTitle,
  toDataPoints,
  crZhConfig, toInfo, crValueMoving,
  crSeriaData, checkToSeries,
  findMinY
} = fnAdapter;

const FaoStatAdapter = {
  crKey: crId,

  toConfig(json, option){
    const _id = crId(option)
    , _title = crTitle(json, option)
    , _subtitle = crSubtitle(json, option)
    , _points = toDataPoints(json, option)
    , config = Builder()
       .areaConfig({ spacingTop: 25 })
       .addCaption(_title, _subtitle)
       .addPoints(_id, _points)
       .addMinMax(_points, option)
       .addTooltip(Tooltip.vDmy)
       .add({
         info: toInfo(json, _title, _subtitle),
         valueMoving: crValueMoving(_points),
         zhConfig: crZhConfig(_id, option)
       })
       .toConfig();
    return { config };
  },

  toSeries(json, option){
    if (!checkToSeries(option)) {
      throw new Error('ERR_10');
    }
    const _data = crSeriaData(json, option)
    , { oneCaption } = option;
    return Builder()
      .initSeria()
      .add({
        data: _data,
        minY: findMinY(_data),
        zhValueText: oneCaption,
        zhItemCaption: oneCaption
      })
      .toSeria();
  }
};

export default FaoStatAdapter
