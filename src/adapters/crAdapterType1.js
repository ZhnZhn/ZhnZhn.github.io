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
}), NOP = () => {}
, IDENTITY = v => v
, _assign = Object.assign;

const crAdapterType1 = ({
  crData,
  crConfOption=crConfOptionDf,
  addConfOption=NOP,
  trOption=NOP,
  addConfig=IDENTITY
}) => {
  const adapter = {
    crKey(option){
      return option._itemKey;
    },
    toConfig(json, option){
      const data = crData(json, option)
      , confOption = _assign(
          crConfOption(option, json),
          addConfOption(option, json)
      );
      trOption(option, json)
      return {
        config: addConfig(crConfigType1({
          option, data, confOption,
        }), json, option)
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
};

crAdapterType1.Builder = Builder

export default crAdapterType1
