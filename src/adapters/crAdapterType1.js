import crConfigType1 from '../charts/crConfigType1'

const { Builder } = crConfigType1
, _isArr = Array.isArray
, _assign = Object.assign
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
, crKeyDf = ({ _itemKey }) => _itemKey;

const crAdapterType1 = ({
  crKey=crKeyDf,
  crData,
  crConfOption=crConfOptionDf,
  addConfOption=NOP,
  trOption=NOP,
  addConfig=IDENTITY
}) => {
  const adapter = {
    crKey,
    toConfig(json, option){
      const _data = crData(json, option)
      , data = _isArr(_data)
         ? _data
         : (_data || {}).data
      , confOption = _assign(
          crConfOption(option, json, _data),
          addConfOption(option, json)
      );
      trOption(option, json)
      return {
        config: addConfig(Builder(
          crConfigType1({ option, data, confOption })
        ), json, option, _data).toConfig()
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

export default crAdapterType1
