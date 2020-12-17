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
}), crConfigOptionDf = (option) => ({
  zhConfig: _crZhConfig(option)
});

const crAdapterType1 = (
  crData,
  crConfigOption=crConfigOptionDf
) => {
  const adapter = {
    crKey(option){
      return option._itemKey;
    },
    toConfig(json, option){
      const data = crData(json, option)
      , confOption = crConfigOption(option);
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
