import crConfigType1 from '../charts/crConfigType1';
import { crSeriaConfigFromAdapter } from '../charts/configBuilderFn';
import {
  FN_IDENTITY,
  FN_NOOP,
  crDfItemKey,
  isArr,
  isObj,
  isNumber,
  assign,
  crItemCaptionCurrencyRate
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
});

export const fCrConfOptionExchangeRate = (
  toCurrency,
  exchangeRateCaseId="EXR"
) => option => {
  if (option.dfCase === exchangeRateCaseId) {
    option.itemCaption = crItemCaptionCurrencyRate(option, toCurrency)
  }
  return crConfOptionDf(option);
}

export const fCrDataType1 = (
  getItems,
  fCrItemTuple
) => (
  json,
  options
) => {
  const _crItemTuple = fCrItemTuple(options);
  return getItems(json)
   .reduce((data, item) => {
     const p = isObj(item)
       ? _crItemTuple(item)
       : void 0;
     if (p && isNumber(p[0]) && isNumber(p[1])) {
       data.push(p)
     }
     return data;
   }, []);
}

export const crAdapterType1 = ({
  crKey=crDfItemKey,
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
