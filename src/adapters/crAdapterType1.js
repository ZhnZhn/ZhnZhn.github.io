import crConfigType1 from '../charts/crConfigType1';
import { crSeriaConfigFromAdapter } from '../charts/configBuilderFn';
import {
  FN_IDENTITY,
  FN_NOOP,
  isArr,
  assign
} from './AdapterFn';

const _crZhConfig = ({
   _itemKey,
   itemCaption,
   dataSource,
}) => ({
  id: _itemKey,
  key: _itemKey,
  itemCaption,
  dataSource
}), crConfOptionDf = (option) => ({
  zhConfig: _crZhConfig(option)
})
, crKeyDf = ({ _itemKey }) => _itemKey;

const crAdapterType1 = ({
  crKey=crKeyDf,
  crData,
  crConfOption=crConfOptionDf,
  addConfOption=FN_NOOP,
  trOption=FN_NOOP,
  addToConfig=FN_IDENTITY
}) => {
  const adapter = {
    crKey,
    toConfig(json, option){
      const _data = crData(json, option)
      , data = isArr(_data)
         ? _data
         : (_data || {}).data
      , confOption = assign(
          crConfOption(option, json, _data),
          addConfOption(option, json)
      );
      trOption(option, json)
      return {
        config: addToConfig(
          crConfigType1({ option, data, confOption }),
          json,
          option,
          _data
        )
      };
    },
    toSeries(json, option){
      return crSeriaConfigFromAdapter({
        adapter,
        json,
        option,
        type: 'spline'
      });
    }
  }
  return adapter;
};

export default crAdapterType1
