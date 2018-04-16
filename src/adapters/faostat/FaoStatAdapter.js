
import ConfigBuilder from '../../charts/ConfigBuilder'
import Tooltip from '../../charts/Tooltip'

import fnAdapter from './fnAdapter'
const {
       crId, crSubtitle, crTitle,
       toDataPoints,
       crZhConfig, toInfo, crValueMoving,
       crSeriaData, checkToSeries
     } = fnAdapter;

const FaoStatAdapter = {
  crKey: crId,
  
  toConfig(json, option){
    const { subtitle } = option
    , _id = crId(option)
    , _title = crTitle(option, json)
    , _subtitle = crSubtitle(json, subtitle)
    , _points = toDataPoints(json, option)
    , config = ConfigBuilder()
       .initBaseArea()
       .add('chart', { spacingTop: 25 })
       .addCaption(_title, _subtitle)
       .addPoints(_id, _points)
       .addTooltip(Tooltip.fnBasePointFormatter)
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
      throw new Error('ZH_1000');
    }
    const _data = crSeriaData(json, option)
        , _id = crId(option)
        , { parentId, oneCaption } = option;
    return ConfigBuilder()
      .initBaseSeria()
      .add({
        data: _data,
        zhSeriaId: parentId + '_' + _id,
        zhValueText: oneCaption,
        zhItemCaption: oneCaption
      })
      .toConfig();
  }
};

export default FaoStatAdapter
