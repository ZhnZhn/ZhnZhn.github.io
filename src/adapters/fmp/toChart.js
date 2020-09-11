import crConfigType1 from '../../charts/crConfigType1';
import fnAdapter from './fnAdapter'

const { Builder } = crConfigType1
, {
  crCaption,
  crData,
  crConfigOption
} = fnAdapter
, _assign = Object.assign;

const toChart = {
  toConfig(json, option){
    const { dfPn, _propName } = option
    , _rowData = dfPn ? json[dfPn] : json
    , data = crData(_rowData, _propName)
    , confOption = crConfigOption(option);

    _assign(option, crCaption(option))

    return {
      config:  crConfigType1({
         option, data, confOption
      })
    };
  },

  toSeries(json, option){
    return Builder.crSeria({
      adapter: toChart,
      json, option
    });
  }
};

export default toChart
