import crConfigType1 from '../charts/crConfigType1'

const { Builder } = crConfigType1
, _crZhConfig = ({
   _itemKey,
   itemCaption,
   dataSource,
}) => ({
  id: _itemKey, key: _itemKey,
  itemCaption,
  dataSource
}), crConfOptionDf = (option) => ({
  zhConfig: _crZhConfig(option)
}), trOptionDf = () => {};

const crAdapterType1 = ({
  crData,
  crConfOption=crConfOptionDf,
  trOption=trOptionDf
}) => {
  const adapter = {
    crKey(option){
      return option._itemKey;
    },
    toConfig(json, option){
      const data = crData(json, option)
      , confOption = crConfOption(option, json);
      trOption(option, json)
      return {
        config: crConfigType1({
          option, data, confOption,
        })
      };
    },
    toSeries(json, option){
      return Builder.crSeria({
        adapter, json, option,
        type: 'spline'
      });
    }
  }
  return adapter;
}

export default crAdapterType1
